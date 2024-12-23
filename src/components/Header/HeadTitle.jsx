import React from 'react';
import { motion } from 'framer-motion';
import moment from 'moment'; // Import Moment.js

const HeadTitle = () => {
  const letters = "The Content Hub".split(""); // Split each character into an array
  const currentTime = moment().format('dddd, MMMM Do YYYY'); // Format: Tuesday, December 24th 2024

  return (
    <div>
      <div className="flex py-8">
        {/* Display Current Date */}
        <div className="w-[33%] flex justify-around text-sm text-gray-600">
          <p className='text-base'>{currentTime}</p>
        </div>
        <div className="w-[34%] justify-center text-4xl font-bold flex space-x-1">
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
        <div className='w-[33%]'>

        </div>
      </div>
    </div>
  );
};

export default HeadTitle;
