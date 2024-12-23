import React from 'react';
import SocialBars from '../components/Social/SocialBars';
import RecentPost from './MainLayout/RecentPost';
import Newsletter from './MainLayout/RightBar/Newsletter';

const RightLayout = () => {
  return (
    <div>

      <div>
        <RecentPost></RecentPost>
      </div>
      
      <div>
        <SocialBars></SocialBars>
      </div>

      <div className='border-[2px] p-3 my-3 rounded-lg'>
        <Newsletter></Newsletter>
      </div>

    </div>
  );
};

export default RightLayout;