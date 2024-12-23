import React from 'react';
import Marquee from 'react-fast-marquee';

const LatestBlog = () => {
  return (
    <div className="px-4 my-4">
      {/* Title Section */}
      <div className="flex items-center gap-2">
        <p className="bg-rose-600 text-white px-4 py-1 rounded-md text-sm font-semibold shadow-lg">
          Latest:
        </p>
        {/* Marquee Section */}
        <div className="flex-1 overflow-hidden">
          <Marquee pauseOnHover={true} speed={50} gradient={true} gradientWidth={50}>
            {Array.from({ length: 20 }, (_, index) => (
              <a
                key={index}
                href="#"
                className="mx-4 text-blue-600 hover:text-blue-800 font-medium transition duration-300"
              >
                Blog {index + 1}
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
