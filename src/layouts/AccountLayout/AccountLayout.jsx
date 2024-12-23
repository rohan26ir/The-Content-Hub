import React from 'react';
import { Outlet } from 'react-router-dom';
import NavAccount from '../../components/Navbar/NavAccount';

const AccountLayout = () => {
  return (
    <div>

    <header>
    <div>
      <NavAccount></NavAccount>
    </div>
    </header>

    {/* Main */}
    <main>
      <Outlet></Outlet>
    </main>
    
  </div>
  );
};

export default AccountLayout;