import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Alluser = () => {
    let [axiosSecure] = useAxiosSecure();
    let { data: users = [], refetch } = useQuery(['users'], async () => {
        let res = await axiosSecure.get('/users')
        return res.data

    })

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
                fetch(`http://localhost:5000/users/admin/${item._id}`, {
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

    let makeadmin = (it) => {
        fetch(`http://localhost:5000/users/admin/${it._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
            })
    }
    return (
        <div className='w-4/5'>
            {users.length}
            <div className=" overflow-x-auto w-full ">
                <table className="table  w-full ">
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
                            users.map((it, index) =>
                                <tr
                                    key={it._id}
                                >

                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {it.name}
                                    </td>
                                    <th>{
                                        it.role === 'admin' ? 'admin' :

                                            <button className="btn btn-ghost btn-xs" onClick={() => makeadmin(it)} >x</button>
                                    }
                                    </th>
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

export default Alluser;