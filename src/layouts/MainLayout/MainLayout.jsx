import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RightLayout from "../RightLayout";
import HeadTitle from "../../components/Header/HeadTitle";
import LatestBlog from "../../components/Header/LatestBlog";
import DarkMode from "../../components/DarkMode/DarkMode";
import Banner from "../../components/Banner/Banner";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div>
      {/* Header */}
      <header>
        <div>
          <HeadTitle />
          <Navbar />
          <LatestBlog />
          {/* Render Banner only on the Home page */}
          {location.pathname === "/" && <Banner />}
        </div>
      </header>

      {/* Main Content */}
      <main className="w-11/12 min-h-screen mx-auto my-5">
  <div className="flex flex-col md:flex-row">
    {/* Main Content Area */}
    <div className="w-full md:w-3/4">
      <Outlet />
    </div>

    {/* Right Sidebar */}
    <div className="w-full md:w-2/5 relative mt-5 md:mt-0">
      <RightLayout />

      {/* Dark Mode Toggle */}
      <div className="fixed bottom-5 right-5 md:top-1/2 md:-translate-y-1/2 md:-right-1 transform md:rotate-90">
        <DarkMode />
      </div>
    </div>
  </div>
</main>


      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
