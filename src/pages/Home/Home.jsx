import React from 'react';
import RecentBlogs from './RecentBlogs';

const Home = () => {
  return (
    <div>
      
      <div>
      <h2 className=" pl-8 text-4xl font-bold text-gray-900">Recent Posts</h2>
        <RecentBlogs></RecentBlogs>
      </div>

    </div>  
  );
};

export default Home;