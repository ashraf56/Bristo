import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Orde from "../Pages/Orde";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Dashbord from "../Dashbord/Dashbord";
import Mycart from "../Dashbord/SIdebar/Mycart";
import Userhome from "../Dashbord/Userhome";
import Alluser from "../Dashbord/Adminside/Alluser";
import Proute from "./Proute";
import AdminRoute from "./AdminRoute";
import ManageMenuitems from "../Dashbord/Adminside/ManageMenuitems";
import Additem from "../Dashbord/Adminside/Additem";
import Payment from "../Dashbord/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/menu',
        element: <Menu></Menu>
      },
      {
        path: '/order',
        element: <Orde></Orde>
      },
      {
        path: '/order/:category',
        element: <Orde></Orde>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
    ]



  },

  {
    path: 'dashbord',
    element:
      <Proute>
        <Dashbord></Dashbord>
      </Proute>,
    children: [
      {
        path: 'mycart',
        element: <Mycart></Mycart>
      },
      {
        path: 'user',
        element: <Userhome></Userhome>
      },
      {
        path: 'pay',
        element: <Payment></Payment>
      },
      {
        path: 'alluser',
        element: <AdminRoute><Alluser></Alluser></AdminRoute>
      },
      {
        path: 'manageuser',
        element: <AdminRoute><ManageMenuitems></ManageMenuitems></AdminRoute>
      },
      {
        path: 'additem',
        element: <AdminRoute><Additem></Additem></AdminRoute>
      },
    ]
  }
]);

export default router;