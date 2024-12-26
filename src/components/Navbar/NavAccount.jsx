import React from "react";
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import DarkMode from "../DarkMode/DarkMode";
import useAuth from "../../hooks/useAuth";

const NavAccount = () => {
  const { darkMode } = useAuth();

  // Dark mode theme classes
  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const buttonTheme = darkMode ? 'btn-primary' : 'btn-secondary'; // For Sign Up and Sign In buttons
  const hoverColor = darkMode ? 'hover:text-[#FF5722] text-black' : 'hover:text-[#007BFF]'; // Hover color for links

  const letters = "The Content Hub".split(""); // Split each character into an array
  
  return (
    <div className={`navbar px-3 ${themeMode}`}>
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Hamburger Menu for Small Screens */}
        
        {/* Logo */}
        <NavLink to={'/'}>
          <div className={`w-full justify-center text-2xl font-bold flex space-x-1 text-center lg:w-[34%] lg:justify-start ${themeMode}`}>
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.5, color: "#ff5722" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className={`cursor-pointer text-xl ${hoverColor}`}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <div className="bg-base-200 p-2 rounded-box py-1 px-3">
          <ul className="menu menu-horizontal px-1 gap-3">
            <li>
              <NavLink to="/" className={hoverColor}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/Add-Blog" className={hoverColor}>Add Blog</NavLink>
            </li>
            <li>
              <NavLink to="/All-blogs" className={hoverColor}>All Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/Featured-Blogs" className={hoverColor}>Featured Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/Wishlist" className={hoverColor}>Wishlist</NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        <div className="hidden md:block">
          <DarkMode />
        </div>
        <NavLink to="/Account/signup" className={`btn ${buttonTheme}`}>
          Sign Up
        </NavLink>
        <NavLink to="/Account/signin" className={`btn ${buttonTheme}`}>
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default NavAccount;
