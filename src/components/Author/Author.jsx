import React from 'react';
import useAuth from '../../hooks/useAuth';

const Author = ({ blog }) => {
  const { darkMode } = useAuth();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const borderMode = darkMode ? 'border-gray-600' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const bioColor = darkMode ? 'text-gray-400' : 'text-gray-500';

  const { author } = blog || {};

  return (
    <div className={`max-w-sm mx-auto rounded-lg shadow-lg p-5 border ${borderMode} ${themeMode}`}>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        
        <div>
          {/* Author's Image */}
          <img
            src={author?.photo}
            alt={author?.name}
            className="w-16 h-16 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        {/* Author's Name and Bio */}
        <div>
          <h3 className={`text-xl font-semibold ${textColor}`}>{author?.name}</h3>
          <p className={`text-sm italic ${bioColor}`}>{author?.bio || "Writer, thinker, and creator of amazing stories."}</p>
        </div>
      </div>
    </div>
  );
};

export default Author;
