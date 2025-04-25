import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Error = () => {
  const { darkMode } = useContext(AuthContext);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* 404 Graphic */}
      <div className="relative mb-8">
        <h1 className="text-9xl md:text-[12rem] font-extrabold tracking-widest animate-pulse">
          404
        </h1>
      </div>

      {/* Error Message */}
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Page Not Found
      </h2>
      <p
        className={`text-lg md:text-xl max-w-md mb-6 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className={`px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 ${
          darkMode
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;