import React from 'react';
import ShareButtons from '../Social/ShareButtons';

const Author = ({ blog }) => {
  const { author } = blog || {};

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-5 border border-gray-200">
      <div className="flex items-center gap-4">
        {/* Author's Image */}
        <img
          src={author?.photo}
          alt={author?.name}
          className="w-16 h-16 rounded-full border-4 border-blue-500 object-cover"
        />

        {/* Author's Name and Bio */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{author?.name}</h3>
          <p className="text-sm text-gray-500 italic">{author?.bio || "Writer, thinker, and creator of amazing stories."}</p>
        </div>
      </div>

    </div>
  );
};

export default Author;
