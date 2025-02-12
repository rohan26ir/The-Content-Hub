import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RightLayout from "../RightLayout";
import HeadTitle from "../../components/Header/HeadTitle";
import LatestBlog from "../../components/Header/LatestBlog";
import DarkMode from "../../components/DarkMode/DarkMode";
import Banner from "../../components/Banner/Banner";
import useAuth from "../../hooks/useAuth";

const MainLayout = () => {
  const location = useLocation();
  const { darkMode } = useAuth();

  const themeMode = darkMode
    ? "bg-[#292929] text-white"
    : "bg-white text-black";
  const headerFooterBg = darkMode ? "bg-[#1f1f1f]" : "bg-white"; // Dark header/footer bg
  const contentBg = darkMode ? "bg-[#181818]" : "bg-white"; // Dark content bg

  return (
    <div className={`${themeMode} min-h-screen`}>
      {/* Header */}
      <header className={`${headerFooterBg}  `}>
        <div>
          {/* <HeadTitle /> */}

          {/* <div className="sticky z-50 top-0">
            <Navbar />
          </div> */}

          <div className=" z-50 top-0">
            <Navbar />
          </div>

          {/* Render Banner only on the Home page */}
          {location.pathname === "/" && <LatestBlog />}
          {/* Render Banner only on the Home page */}
          {location.pathname === "/" && <Banner />}
        </div>
      </header>

      {/* Main Content */}
      <main className={`${themeMode} w-11/12 mx-auto my-5`}>
        <div className="flex flex-col md:flex-row">
          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            <Outlet />
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-2/5 relative mt-5 md:mt-0">
            <RightLayout />
          </div>
        </div>
      </main>

      {/* Fixed Dark Mode Toggle */}
      <div className="hidden md:block">
        <div className="fixed right-2 rotate-90 top-1/2 transform -translate-y-1/2 z-50">
          <DarkMode />
        </div>
      </div>

      <div className="md:hidden">
        <div className="fixed right-2 bottom-0 transform -translate-y-1/2 z-50">
          <DarkMode />
        </div>
      </div>

      {/* Footer */}
      <footer className={`${headerFooterBg}`}>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
