import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="navbar bg-base-100 px-3">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Hamburger Menu for Small Screens */}
        <div className="dropdown z-50">
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
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Add-Blog">Add Blog</NavLink></li>
            <li><NavLink to="/All-blogs">All Blogs</NavLink></li>
            <li><NavLink to="/Featured-Blogs">Featured Blogs</NavLink></li>
            <li><NavLink to="/Wishlist">Wishlist</NavLink></li>
          </ul>
        </div>

        {/* Logo and User Info */}
        <div className="hidden md:block">
        <div className="flex items-center gap-2">
          <div>
            <img
              className="h-10 w-10 rounded-full ml-3"
              src={user ? user?.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt={user ? `${user.displayName} Avatar` : "User Avatar"}
            />
          </div>
          <div>
            <p className="text-xl font-bold">{user ? user.displayName : 'User'}</p>
          </div>
        </div>
        </div>

      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <div className="bg-base-200 p-2 rounded-box py-1 px-3">
          <ul className="menu menu-horizontal px-1 gap-3">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Add-Blog">Add Blog</NavLink></li>
            <li><NavLink to="/All-blogs">All Blogs</NavLink></li>
            <li><NavLink to="/Featured-Blogs">Featured Blogs</NavLink></li>
            <li><NavLink to="/Wishlist">Wishlist</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Navbar End */}

      

      <div className="navbar-end gap-2 ">

        <div className="md:hidden ">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-lg font-bold">{user ? user.displayName : 'User'}</p>
          </div>
          <div>
            <img
              className="h-10 w-10 rounded-full ml-3"
              src={user ? user?.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt={user ? `${user.displayName} Avatar` : "User Avatar"}
            />
          </div>
        </div>
        </div>

        <div className="hidden md:block">
        {user ? (
          <button
            onClick={logOut}
            className="px-4 py-1 bg-red-600 hover:bg-rose-700 text-white font-semibold rounded-md"
          >
            Log Out
          </button>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/Account/signup" className="btn btn-primary">
              Sign Up
            </NavLink>
            <NavLink to="/Account/signin" className="btn btn-secondary">
              Sign In
            </NavLink>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
