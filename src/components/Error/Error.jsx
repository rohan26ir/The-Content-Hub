import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to previous page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center min-h-screen bg-gray-100"
    >
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-9xl font-bold text-blue-500"
      >
        404
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-6xl font-bold text-gray-700"
      >
        Page not found
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-2xl font-bold mt-14 text-gray-600"
      >
        Something's wrong here...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-5 text-gray-500"
      >
        We can't find the page you're looking for.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex gap-2 mt-10 flex-col md:flex-row items-center justify-center"
      >

        <div>
          <Link
            to="/"
            className="text-lg font-bold text-purple-700 px-3 py-1 bg-blue-400 rounded-md hover:bg-blue-500 transition"
          >
            Go back to home
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Error;
