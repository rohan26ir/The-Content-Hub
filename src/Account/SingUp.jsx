import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const SignUp = ({ darkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { createNewUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode: authDarkMode } = useAuth();

  const themeMode = authDarkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const inputMode = authDarkMode ? 'input-bordered bg-[#424242] text-white' : 'input-bordered bg-white text-black';
  const btnMode = authDarkMode ? "bg-gray-500 text-white" : "bg-[#007bff] text-white"; // Sign Up button color
  const googleBtnMode = authDarkMode ? "bg-red-600 text-white" : "bg-red-600 text-white"; // Google sign-in button color
  const labelText = authDarkMode ? "text-white" : "text-black"; // Label text color

  const handleSignUp = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }
    setPasswordError("");

    if (!name || !photo || !email || !password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    }

    try {
      const result = await createNewUser(email, password);
      const user = result.user;
      setUser(user);
      await updateProfile(user, { displayName: name, photoURL: photo });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Welcome, ${name}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      setUser(user);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Welcome, ${user.displayName || "User"}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state?.from || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center relative overflow-hidden ${themeMode}`}
    >

      <Helmet>
        <title>Sign Up | The Content Hub</title>
      </Helmet>
      <div className={`relative z-10 w-full max-w-md p-2 shadow-xl rounded-lg border my-4 ${authDarkMode ? 'bg-[#2b2b40]' : 'bg-white'}`}>
        <h2
          className={`text-center text-2xl font-bold mx-auto p-2 border-b-[1px] ${authDarkMode ? 'border-gray-400' : 'border-gray-500'} w-[80%] ${authDarkMode ? 'text-[#ffeba7]' : 'text-[#000000]'}`}
          style={{ textShadow: "1px 1px 20px #ffeba7" }}
        >
          Sign Up for an Account
        </h2>

        <form onSubmit={handleSignUp} className="card-body px-3 py-1">
          <div className="form-control">
            <label className={`label ${labelText}`}>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`input ${inputMode}`}
              required
            />
          </div>
          <div className="form-control">
            <label className={`label ${labelText}`}>Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Enter your photo URL"
              className={`input ${inputMode}`}
              required
            />
          </div>
          <div className="form-control">
            <label className={`label ${labelText}`}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`input ${inputMode}`}
              required
            />
          </div>
          <div className="form-control relative">
            <label className={`label ${labelText}`}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className={`input ${inputMode}`}
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="h-8 w-8 cursor-pointer text-orange-500 absolute right-4 top-11 rounded-full flex justify-center items-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className={`btn rounded-none mt-3 ${btnMode}`}
          >
            Sign Up
          </button>
          <p className="text-sm text-center py-1">
            Already have an account?{" "}
            <Link to="/Account/signin" className="text-blue-600">
              Sign in here
            </Link>
          </p>
          <button
            onClick={handleSignInGoogle}
            className={`btn mt-2 flex items-center justify-center ${googleBtnMode}`}
            aria-label="Sign in with Google"
          >
            <FcGoogle className="mr-2" /> Log in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
