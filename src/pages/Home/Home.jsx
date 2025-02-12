import React from 'react';
import RecentBlogs from './RecentBlogs';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div>
      <div>
        <h2 className='text-4xl font-bold'>Recent Posts</h2>
        <RecentBlogs></RecentBlogs>
      </div>
    </div>
  );
};

export default Home;
