import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ContextAuth } from './Authprovider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Social from './Social';

const Signup = () => {
  let { user, Createuser, updateProf } = useContext(ContextAuth)
  let navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm();

  let onSubmit = (data) => {
    console.log(data);
    Createuser(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProf(data.name, data.photoURL)
          .then(() => {
            let saveinfo = { name: data.name, email: data.email }
            fetch('http://localhost:5000/users', {
              method: "POST"
              , headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(saveinfo)
            })
              .then(r => r.json()).then(data => {
                if (data.insertedId) {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              })


            navigate('/')
          }).catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    reset();

  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name"
                  {...register("name")}

                  className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Url</span>
                </label>
                <input type="url" placeholder="url"
                  {...register("photoURL")}

                  className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email"
                  {...register("email")}

                  className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password"
                  {...register("password")}
                  className="input input-bordered" />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                <label className="label">
                  <Link to='/login' className="label-text-alt link link-hover">log in</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">sign</button>
              </div>
            </form>
            <Social></Social>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;