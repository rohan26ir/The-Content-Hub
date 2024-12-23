import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Importing Moon and Sun icons
import { AuthContext } from "../../AuthProvider/AuthProvider";

const DarkMode = () => {
  const { darkMode, setDarkMode } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={() => setDarkMode(!darkMode)}
        className={`relative w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer transition-colors duration-300 p-1`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center transition-transform duration-300 ${
            darkMode ? "translate-x-8" : ""
          }`}
        >
          {darkMode ? (
            <FaMoon className="text-yellow-400" size={16} />
          ) : (
            <FaSun className="text-yellow-500" size={16} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkMode;