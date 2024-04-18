import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useMenu from '../Hooks/useMenu';
import { ContextAuth } from '../Authentication/Authprovider';
import useCart from '../Hooks/useCart';


const Navbar = () => {
  let { user, logout } = useContext(ContextAuth);
  let [cart] = useCart()
  let signOut = () => {
    logout()
      .then(() => {

      }).catch((error) => {
      });
  }
  return (
    <div >
      <div className="navbar fixed max-w-screen-xl z-30 bg-opacity-30 bg-base-100 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to='/'>Home</Link>
              </li>

              <li>
                <Link to='/menu'>Menu</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">
            <li>
              <Link to='/'>Home</Link>
            </li>

            <li>
              <Link to='/menu'>Menu</Link>
            </li>
            <li>
              <Link to='/order'>Order</Link>
            </li>
            <li>
              {user ? <>
                {user?.displayName && <button>{user.displayName}</button>}
                {user?.photoURL &&
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </div>

                }
                <button onClick={signOut}>Log out</button>
              </> : <Link to='/login'>Login</Link>}
            </li>
            <li>
              {user && <Link to='dashbord/mycart'>DashBoard</Link>}
            </li>


            <li >
              <button>
                Inbox
                {user ? <div className="badge badge-secondary">{cart.length}</div> : <div className="badge badge-secondary">0</div>}
              </button>

            </li>

          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;