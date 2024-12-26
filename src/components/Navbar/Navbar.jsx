import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut, darkMode } = useContext(AuthContext);

  // Dark mode theme classes
  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const navItemColor = darkMode ? 'text-black' : 'text-black';
  const buttonPrimary = darkMode ? 'bg-[#FF5733] hover:bg-[#FF6F47]' : 'bg-[#FF5733] hover:bg-[#FF6F47]';
  const buttonSecondary = darkMode ? 'bg-[#C70039] hover:bg-[#D1003D]' : 'bg-[#C70039] hover:bg-[#D1003D]';
  const buttonLogOut = darkMode ? 'bg-red-600 hover:bg-rose-700' : 'bg-red-600 hover:bg-rose-700';

  return (
    <div className={`navbar px-3 ${themeMode}`}>
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
            <li><NavLink to="/" className={navItemColor}>Home</NavLink></li>
            <li><NavLink to="/Add-Blog" className={navItemColor}>Add Blog</NavLink></li>
            <li><NavLink to="/All-blogs" className={navItemColor}>All Blogs</NavLink></li>
            <li><NavLink to="/Featured-Blogs" className={navItemColor}>Featured Blogs</NavLink></li>
            <li><NavLink to="/Wishlist" className={navItemColor}>Wishlist</NavLink></li>

            {user ? (
              <li><button
                onClick={logOut}
                className={`px-4 py-1 ${buttonLogOut} text-white font-semibold rounded-md`}
              >
                Log Out
              </button></li>
            ) : (
              <>
                <li><NavLink to="/Account/signin" className={`${buttonPrimary} mb-2`}>
                  Sign In
                </NavLink></li>
                <li><NavLink to="/Account/signup" className={`${buttonSecondary}`}>
                  Sign Up
                </NavLink></li>
              </>
            )}
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
            <li><NavLink to="/" className={navItemColor}>Home</NavLink></li>
            <li><NavLink to="/Add-Blog" className={navItemColor}>Add Blog</NavLink></li>
            <li><NavLink to="/All-blogs" className={navItemColor}>All Blogs</NavLink></li>
            <li><NavLink to="/Featured-Blogs" className={navItemColor}>Featured Blogs</NavLink></li>
            <li><NavLink to="/Wishlist" className={navItemColor}>Wishlist</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        <div className="md:hidden">
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
              className={`px-4 py-1 ${buttonLogOut} text-white font-semibold rounded-md`}
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
