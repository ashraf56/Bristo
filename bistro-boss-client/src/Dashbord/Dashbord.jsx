import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const Dashbord = () => {
  // let isadmin=true;
  let [isadmin] = useAdmin()
  return (
    <div>
      <div className="drawer drawer-mobile ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  items-center justify-center">
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-yellow-800 text-white">

            {isadmin ? <>
              <li><Link to='/dashbord/mycart'>  Admin Home</Link></li>
              <li><Link to='/dashbord/alluser'> AllUser </Link></li>
              <li><Link to='/dashbord/manageuser'> Manage  menu Items </Link></li>
              <li><Link to='/dashbord/additem'> Add item </Link></li>
            </> : <>
              <li><Link to='/dashbord/mycart'>  My cart</Link></li>
              <li><Link to='/dashbord/user'> User Home</Link></li>


            </>
            }



            <li><Link to='/'>  Home</Link></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Dashbord;