import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaRegHandshake, FaSearch } from 'react-icons/fa'; // Icons for links


const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo on the left (Image instead of text) */}
        <div>
          <Link to="/">
          <img src="/logoC.png" alt="Covoiturage Logo" className="h-8" />
          {/* Adjust path as necessary */}
          </Link>
        </div>

        {/* Links aligned to the right */}
        <div className="flex space-x-6 ml-auto">
          <Link
            to="/home"
            className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <FaHome size={20} /> Home
          </Link>

          {/* "Find a Ride" link with icon */}
          <Link
            to="/find"
            className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <FaSearch size={20} /> Find a Ride
          </Link>

          <Link
            to="/offer"
            className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <FaRegHandshake size={20} /> Offer Ride
          </Link>

          <Link
            to="/signin"
            className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <FaSignInAlt size={20} /> Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
