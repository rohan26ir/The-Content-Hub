import React from 'react';

const NoPost = () => {
  return (
    <div>
      
      <div className='flex flex-col justify-center items-center gap-4 my-10'>
      <h2 className="text-xl font-semibold text-gray-700">No Posts Available</h2>
      <p className="text-gray-500">Sorry, there are no posts in this category yet.</p>
      </div>

    </div>
  );
};

export default NoPost;