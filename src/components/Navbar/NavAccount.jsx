import React from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from 'framer-motion';

const NavAccount = () => {
  const letters = "The Content Hub".split(""); // Split each character into an array
  return (
    <div className="navbar bg-base-100 px-3">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Hamburger Menu for Small Screens */}
        <div className="dropdown">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow absolute"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Add-Blog">Add Blog</NavLink>
            </li>
            <li>
              <NavLink to="/All-blogs">All Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/Featured-Blogs">Featured Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/Wishlist">Wishlist</NavLink>
            </li>
          </ul>
        </div>
        {/* Logo */}
        <div className="w-[34%] justify-center text-2xl font-bold flex space-x-1">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.5, color: "#ff5722" }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="cursor-pointer"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
        {/* End */}
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <div className="bg-base-200 p-2 rounded-box py-1 px-3">
          <ul className="menu menu-horizontal px-1 gap-3">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Add-Blog">Add Blog</NavLink>
            </li>
            <li>
              <NavLink to="/All-blogs">All Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/Featured-Blogs">Featured Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/Wishlist">Wishlist</NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        <NavLink to="/Account/signup" className="btn btn-primary">
          Sign Up
        </NavLink>
        <NavLink to="/Account/signin" className="btn btn-secondary">
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default NavAccount;
