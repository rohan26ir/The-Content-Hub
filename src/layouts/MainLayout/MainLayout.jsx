import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import RightLayout from "../RightLayout";
import HeadTitle from "../../components/Header/HeadTitle";
import LatestBlog from "../../components/Header/LatestBlog";
import DarkMode from "../../components/DarkMode/DarkMode";

const MainLayout = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <div>
          <HeadTitle></HeadTitle>
          <Navbar></Navbar>
          <LatestBlog></LatestBlog>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-11/12 min-h-screen mx-auto my-5">
        <div className="flex">
          {/* Main Content Area */}
          <div className="w-3/4">
            <Outlet></Outlet>
          </div>

          {/* Right Sidebar */}
          <div className="w-2/5 relative">
            <RightLayout></RightLayout>

            {/* Dark Mode Toggle */}
            <div className="fixed top-1/2 -translate-y-1/2 -right-1 transform rotate-90">
              <DarkMode></DarkMode>
            </div>
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
