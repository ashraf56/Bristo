import React from 'react';
import useCart from '../../Hooks/useCart';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const Mycart = () => {
  let [cart, refetch] = useCart();
  let total3 = cart.reduce((sum, item) => item.price + sum, 0)
  let total = parseFloat(total3.toFixed(2))
  let handledelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cart/${item._id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
      }
    })
  }

  return (
    <div className='flex justify-between w-full items-center'>
      <div className='w-full px-10 '>
        <h2 className='text-5xl font-mono'>This is my cart</h2>

        <div className='flex justify-between w-full pt-14 h-[60px] font-bold '>
          <h3>Total item:{cart.length}</h3>
          <h3 className='text-lg font-mono'>Total:{(total)}</h3>
          <Link to='/dashbord/pay' >      <button className='btn btn-warning'>pay</button></Link>

        </div>
      </div>




      <div className=" overflow-x-auto w-full">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>price</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {
              cart.map((it, index) =>
                <tr
                  key={it._id}
                >

                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={it.image} />
                      </div>
                    </div>
                  </td>
                  <td>
                    {it.name}
                  </td>
                  <td>{it.price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs" onClick={() => handledelete(it)}>x</button>
                  </th>
                </tr>

              )
            }
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Mycart;