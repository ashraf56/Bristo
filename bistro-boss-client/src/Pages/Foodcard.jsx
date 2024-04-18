import React, { useContext } from 'react';
import { ContextAuth } from '../Authentication/Authprovider';
import Swal from 'sweetalert2'
import useCart from '../Hooks/useCart';

const Foodcard = ({ i }) => {
  let { user } = useContext(ContextAuth)
  let { _id, image, name, price } = i
  let [, refetch] = useCart()
  let handlecart = i => {

    if (user && user.email) {
      let caritem = { menuid: _id, name, price, email: user.email, image }
      fetch('http://localhost:5000/cart', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        }
        , body: JSON.stringify(caritem)

      })
        .then(r => r.json()).then(data => {
          console.log(data);
          if (data.message === 'already exist') {
            Swal.fire({
              position: 'bottom-end',
              icon: 'warning',
              title: 'You Already Added This Class',
              text: 'The class you are trying to add has already been added to the cart.',
              showConfirmButton: false,
              timer: 1500
            });
          }
          else if (data.insertedId) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    }
  }


  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-2xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className='bg-slate-900 absolute right-4 top-4 rounded-xl px-6'>${price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => handlecart(i)}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;