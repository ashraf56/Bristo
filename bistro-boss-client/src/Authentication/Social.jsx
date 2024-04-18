import React, { useContext } from 'react';
import { ContextAuth } from './Authprovider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Social = () => {
  let { google } = useContext(ContextAuth)
  let navigate = useNavigate()
  let gsign = () => {
    google()
      .then(result => {
        let loggeduser = result.user;
        let saveinfo = { name: loggeduser.displayName, email: loggeduser.email }

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
      })
  }
  return (
    <div>
      <div className='text-center py-4'>
        <button className="btn btn-circle btn-outline" onClick={gsign}>
          G
        </button>
      </div>
    </div>
  );
};

export default Social;