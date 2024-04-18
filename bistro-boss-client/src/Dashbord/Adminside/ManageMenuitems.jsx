import React from 'react';
import useMenu from '../../Hooks/useMenu';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageMenuitems = () => {
  let [menu, , refetch] = useMenu()
  let [axiosSecure] = useAxiosSecure()

  let handledelete = item => {

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


        axiosSecure.delete(`/menu/${item._id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            refetch();
          })

      }
    })




  }

  return (
    <div>
      <h1>{menu.length}</h1>

      <div className=" overflow-x-auto w-full ">
        <table className="table mx-auto ">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>

              <th>Name</th>
              <th>price</th>
              <th>status</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              menu.map((itm, index) =>
                <tr
                  key={itm._id}
                >

                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <img src={itm.image} className='w-24' />            </td>
                  <td>
                    {itm.name}
                  </td>
                  <td>
                    {itm.price}
                  </td>
                  <td>
                    {itm.status}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs" onClick={() => handledelete(itm)}>delete</button>
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

export default ManageMenuitems;