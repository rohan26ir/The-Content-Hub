import React from 'react';
import SocialBars from '../components/Social/SocialBars';
import RecentPost from './MainLayout/RecentPost';
import Newsletter from './MainLayout/RightBar/Newsletter';
import TopBlog from './MainLayout/RightBar/TopBlog';

const RightLayout = () => {
  return (
    <div className='w-11/12 mx-auto mt-10'>

      <div>
        {/* <Loading></Loading> */}
      </div>

      <div>
        <SocialBars></SocialBars>
      </div>

      <div>
        <TopBlog></TopBlog>
      </div>
      
      <div className='border-[2px] p-3 my-3 rounded-lg'>
        <Newsletter></Newsletter>
      </div>
      
      <div>
        <RecentPost></RecentPost>
      </div>


    </div>
  );
};

export default RightLayout;