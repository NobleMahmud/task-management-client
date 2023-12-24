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
import DashBoard2 from "../pages/DashBoard/DashBoard2";
import EditTask from "../components/EditTask/EditTask";
import NewsLetter from "../pages/NewsLetter/NewsLetter";
import Contact from "../pages/Contact/Contact";

  
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
        path: "/subscribe",
        element: <NewsLetter></NewsLetter>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
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
        path: "/tasks/:id",
        element: <EditTask></EditTask>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashBoard2></DashBoard2></PrivateRoute>,
      }
    ],
    },
  ]);