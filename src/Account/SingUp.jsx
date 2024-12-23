import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";

const SignUp = ({ darkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { createNewUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const themeMode = darkMode
    ? "bg-gradient-to-br from-[#1a1c2b] via-[#29274c] to-[#4a3b74] text-white"
    : "bg-[#FFF5CD] text-black";

  const btnMode = darkMode ? "bg-gray-500 text-white" : "bg-white text-black";

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

      <div className="relative z-10 w-full max-w-md bg-opacity-90 bg-[#2b2b40] p-2 shadow-xl rounded-lg border border-gray-600 my-4">
        <h2
          className="text-center text-2xl font-bold mx-auto p-2 border-b-[1px] border-gray-400 w-[80%] text-[#ffeba7]"
          style={{ textShadow: "1px 1px 20px #ffeba7" }}
        >
          Sign Up for an Account
        </h2>

        <form onSubmit={handleSignUp} className="card-body px-3 py-1">
          <div className="form-control">
            <label className="label text-white">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-white">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Enter your photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-white">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label text-white">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
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
            className={`btn btn-neutral rounded-none mt-3 ${btnMode}`}
          >
            Sign Up
          </button>
          <p className="text-sm text-center py-1 text-white">
            Already have an account?{" "}
            <Link to="/Account/signin" className="text-blue-600">
              Sign in here
            </Link>
          </p>
          <button
            onClick={handleSignInGoogle}
            className="btn bg-red-600 text-white mt-2 flex items-center justify-center"
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
