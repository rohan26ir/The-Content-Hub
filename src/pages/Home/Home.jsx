import React from 'react';
import RecentBlogs from './RecentBlogs';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div>
      <div>
        <motion.h2
          className="pl-8 text-4xl font-bold"
          animate={{
            color: 'rgb(0, 0, 0)', // Default color (black)
          }}
          whileHover={{
            color: [
              'rgb(255, 0, 0)', // Red
              // 'rgb(0, 255, 0)', // Green
              // 'rgb(0, 0, 255)', // Blue
              // 'rgb(255, 0, 0)', // Back to Red
            ],
            x: [0, -2, 2, -2, 2, 0], // Shake effect
          }}
          transition={{
            color: {
              duration: 2, // Time for the RGB color loop
              repeat: Infinity, // Continuous color loop on hover
              ease: 'linear', // Smooth color transition
            },
            x: {
              duration: 0.4, // Duration of the shake effect
              repeat: Infinity, // Continuous shake while hovering
            },
          }}
        >
          Recent Posts
        </motion.h2>
        <RecentBlogs></RecentBlogs>
      </div>
    </div>
  );
};

export default Home;
