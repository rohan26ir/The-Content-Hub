import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="text-xl text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
