import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <div className="navbar bg-base-100 px-3">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
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
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'/Add-Blog'}>Add Blog</NavLink>
              </li>
              <li>
                <NavLink to={'/All-blogs'}>All blogs</NavLink>
              </li>
              <li>
                <NavLink to={'/Featured-Blogs'}>Featured Blogs</NavLink>
              </li>
              <li>
                <NavLink to={'/Wishlist'}>Wishlist</NavLink>
              </li>
              </ul>
            </div>
            <div className="navbar-start">
              <div className="flex items-center">
                <img 
                className="h-10 w-10 rounded-full"
                src={ "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="" />
              </div>
          </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <div className="bg-base-200 p-2 rounded-box py-1 px-3">
            <ul className="menu menu-horizontal px-1 gap-3">
              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'/Add-Blog'}>Add Blog</NavLink>
              </li>
              <li>
                <NavLink to={'/All-blogs'}>All blogs</NavLink>
              </li>
              <li>
                <NavLink to={'/Featured-Blogs'}>Featured Blogs</NavLink>
              </li>
              <li>
                <NavLink to={'/Wishlist'}>Wishlist</NavLink>
              </li>
            </ul>
            </div>
          </div>
          <div className="navbar-end gap-2">
            <p className="btn">Sign Up</p>
            <p className="btn">Sign In</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;