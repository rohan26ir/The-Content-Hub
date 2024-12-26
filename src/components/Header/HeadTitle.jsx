import React from 'react';
import { motion } from 'framer-motion';
import moment from 'moment'; // Import Moment.js

const HeadTitle = () => {
  const letters = "The Content Hub".split(""); // Split each character into an array
  const currentTime = moment().format('dddd, MMMM Do YYYY'); // Format: Tuesday, December 24th 2024

  return (
    <div className="py-8">
      <div className="flex items-center">
        {/* Left Section: Empty Placeholder for Future Use */}
        <div className="w-1/3"></div>

        {/* Center Section: Title with Animation and Date */}
        <div className="w-1/3 mx-auto flex flex-col items-center">
          <div className="text-4xl font-bold flex space-x-1">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.5, color: "#ff5722" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="cursor-pointer"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600 hidden md:block">
            <p className="text-base">{currentTime}</p>
          </div>
        </div>

        {/* Right Section: Empty Placeholder for Future Use */}
        <div className="w-1/3"></div>
      </div>
    </div>
  );
};

export default HeadTitle;
