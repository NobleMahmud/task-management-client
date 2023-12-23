import {
    createBrowserRouter,
  } from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import SignUp2 from "../pages/SignUp/SignUp2";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../pages/DashBoard/DashBoard";

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut></LayOut>,
      children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <SignUp2></SignUp2>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      },
    ],
    },
  ]);