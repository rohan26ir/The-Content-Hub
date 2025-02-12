import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Error = () => {
  const { darkMode } = useContext(AuthContext);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center p-5 ${
        darkMode ? "bg-[#1a1a1a] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        It may have been moved or deleted.
      </p>

    

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all 
          bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
