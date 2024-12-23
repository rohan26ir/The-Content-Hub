import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import RightLayout from '../RightLayout';

const MainLayout = () => {
  return (
    <div>

      <header>
      <div>
        <Navbar></Navbar>
      </div>
      </header>

      {/* Main */}
      <main className='w-11/12 mx-auto my-5 '>
        <div className='flex'>
          <div className='w-3/4'>
          <Outlet></Outlet>
          </div>
          <div className='w-1/4'>
            <RightLayout></RightLayout>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <Footer></Footer>
      </footer>
      
    </div>
  );
};

export default MainLayout;