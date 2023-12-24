import { useEffect } from "react";
import BrandFeature from "../../BrandFeature/BrandFeature";
import Customers from "../../Customers/Customers";
import Features from "../../Features/Features";
import Banner from "../Banner/Banner";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    useEffect(() => {
        AOS.init();
      }, [])
    return (
        <div>
            <Banner></Banner>
            <BrandFeature></BrandFeature>
            <Features></Features>
            <Customers></Customers>
        </div>
    );
};

export default Home;