import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {/* Spinner */}
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner text-8xl text-error animate-spin"></span>
      </div>

      {/* Loading Text */}
      <div className="flex justify-center items-center">
        <p className="text-xl text-gray-700 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
