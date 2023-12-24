import { Outlet } from "react-router-dom";
import NavBar from "../pages/NavBar/NavBar";
import Footer from "../pages/Footer/Footer";

const LayOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default LayOut;