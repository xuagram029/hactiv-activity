import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl text-white font-bold mb-16 text-center text-shadow-lg hover:text-[#013220] transform hover:-translate-y-1 transition duration-500">
        Get Started!
      </h1>
      <h1 className="text-xl text-black mb-16 text-center text-shadow-lg italic hover:not-italic hover:font-bold transform hover:-translate-y-1 transition duration-500">
        Ready to take the first step? Create an account and login now!
      </h1>
      <div className="flex justify-center items-center gap-8">
        <Link
          to="/register"
          className="bg-white text-green-800 font-bold py-2 px-8 rounded-lg shadow-lg hover:text-white hover:bg-[#013220] hover:shadow-xl hover:transform hover:-translate-y-1 transition duration-500"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-white text-green-800 font-bold py-2 px-8 rounded-lg shadow-lg hover:text-white hover:bg-[#013220] hover:shadow-xl hover:transform hover:-translate-y-1 transition duration-500"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;