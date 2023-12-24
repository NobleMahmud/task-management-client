import BrandFeature from "../../BrandFeature/BrandFeature";
import Customers from "../../Customers/Customers";
import Features from "../../Features/Features";
import Banner from "../Banner/Banner";

const Home = () => {
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