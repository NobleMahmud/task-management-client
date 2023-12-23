import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css'

const Banner = () => {
    return (
        <div>
            <div className="relative pt-32 -mt-24 bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
  <div className="absolute inset-0">
    <img src="https://i.ibb.co/Nm4bBsC/task.png" alt="Background Image" className="object-cover object-center w-full mt-12 h-full" />
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
  
  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
  <h1 className="text-5xl font-bold leading-tight mb-4 animate-once-ping animate-glow">Welcome to Task-Ninja</h1>
      <p className="text-lg text-gray-300 mb-8 hover:animate-glow">Discover amazing features and services that await you.</p>
    <Link to="/login" href="#" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Let's Explore</Link>
  </div>
</div>
        </div>
    );
};

export default Banner;