import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Banner = () => {
  const {darkMode} = useAuth();
  

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';



  const handleExploreClick = () => {
    const targetSection = document.getElementById("blogs-section");
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth", // Smooth scrolling animation
        block: "center",    // Center vertically in the viewport
      });
      
    }
  };

  return (
    <div className="relative w-full h-[300px] bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 overflow-hidden">
      {/* Background Image */}
      <motion.img
        src="https://i.ibb.co.com/2qQB7XY/futuristic.webp"
        alt="Blog Banner"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-5">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to the Content Hub
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore insightful articles, tips, and stories from around the globe.
        </motion.p>
        <motion.button
          onClick={handleExploreClick}
          className="px-6 py-3 bg-blue-700 hover:bg-blue-900 rounded-lg font-semibold text-lg transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Explore Home Page
        </motion.button>
      </div>
    </div>
  );
};

export default Banner;
