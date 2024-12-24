import React from 'react';
import SocialBars from '../components/Social/SocialBars';
import RecentPost from './MainLayout/RecentPost';
import Newsletter from './MainLayout/RightBar/Newsletter';

const RightLayout = () => {
  return (
    <div className='w-11/12 mx-auto'>

      <div>
        {/* <Loading></Loading> */}
      </div>

      <div>
        <SocialBars></SocialBars>
      </div>
      
      <div>
        <RecentPost></RecentPost>
      </div>
      

      <div className='border-[2px] p-3 my-3 rounded-lg'>
        <Newsletter></Newsletter>
      </div>

    </div>
  );
};

export default RightLayout;