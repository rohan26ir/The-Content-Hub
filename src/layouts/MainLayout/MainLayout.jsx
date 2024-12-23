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
      <main>
        <div>
          <div>
          <Outlet></Outlet>
          </div>
          <div>
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