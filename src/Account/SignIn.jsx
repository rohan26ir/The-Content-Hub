import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { logIn, signInWithGoogle, setUser, darkMode } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';

  const googleMode = darkMode
  ? " bg-black"
  : " bg-white"

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        handleNavigation(
          result.user,
          `Welcome ${result.user.displayName || "User"}!`
        );
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleSignInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        handleNavigation(
          result.user,
          `Welcome ${result.user.displayName || "User"}!`
        );
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleNavigation = (user, message) => {
    setUser(user);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      navigate(location?.state || "/");
    }, 1600);
  };

  const handleError = (error) => {
    const friendlyMessage = error.message.includes("user-not-found")
      ? "No account found with this email."
      : error.message.includes("wrong-password")
      ? "Incorrect password. Try again."
      : "An unexpected error occurred.";
    setErrorMessage(friendlyMessage);
  };

  const handleForgetPasswordClick = () => {
    const email = emailRef.current.value || "";
    navigate("/forget-password", { state: { email } });
  };

  return (
    <div className={`flex pt-16 justify-center items-center p-4 relative overflow-hidden ${themeMode}   h-screen`}>
     

      <Helmet>
        <title>Sign In | The Content Hub</title>
      </Helmet>
      
      <div className="w-full max-w-md bg-opacity-90 bg-[#2b2b40] p-5 shadow-xl rounded-lg border border-gray-600">
        <h2 className="text-center text-2xl font-extrabold text-[#ffeba7] mb-2" style={{ textShadow: '1px 1px 20px' }}>
          Login to Your Account
        </h2>
        <form onSubmit={handleLogIn} className="space-y-6">
          <div className="form-control">
            <label className="text-white">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered bg-[#1a1c2b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="text-white">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered bg-[#1a1c2b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-300"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          )}
          
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-center text-white mt-4">
          Don’t Have An Account?{" "}
          <Link to={"/Account/signup"} className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
        <button
          onClick={handleSignInGoogle}
          className={` ${googleMode} mt-4 flex items-center justify-center w-full py-2 text-gray-700 rounded-lg shadow-lg hover:bg-gray-100 `}
        >
          <FcGoogle className="text-2xl mr-2" /> Log in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;