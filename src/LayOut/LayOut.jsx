import { Outlet } from "react-router-dom";
import NavBar from "../pages/NavBar/NavBar";
import NavBar2 from "../pages/NavBar/NavBar2";
import NavBar3 from "../pages/NavBar/NavBar3";

const LayOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            {/* <NavBar2></NavBar2> */}
            {/* <NavBar3></NavBar3> */}
            <Outlet></Outlet>
        </div>
    );
};

export default LayOut;