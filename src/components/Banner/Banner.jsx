import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[300px] bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 overflow-hidden">
      {/* Background Image */}
      <img
        src="https://img.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148435100.jpg?t=st=1734995176~exp=1734998776~hmac=a31b6c652fb57a67a443971b5350a5890f1549e5fd970b44a668baf07a291885&w=996"
        alt="Blog Banner"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to the Blog World
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Explore insightful articles, tips, and stories from around the globe.
        </p>
        <button className="px-6 py-3 bg-blue-700 hover:bg-blue-900 rounded-lg font-semibold text-lg transition duration-300">
          Explore Blogs
        </button>
      </div>
    </div>
  );
};

export default Banner;
