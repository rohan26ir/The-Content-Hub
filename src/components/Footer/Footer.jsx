import React from "react";
import logo from '../../assets/CH-logo.webp'
import useAuth from "../../hooks/useAuth";

const Footer = () => {
  const { darkMode } = useAuth();

  // Dark mode theme classes
  const themeMode = darkMode ? 'bg-black text-white' : 'bg-white text-black';
  const linkColor = darkMode ? 'text-gray-300 hover:text-white' : 'text-black hover:text-blue-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-[#34495e]';

  return (
    <div >
      <footer className={`footer p-5 md:p-10  md:px-16 ${themeMode}`}>
        <aside>
          <div className="flex justify-center items-center">
            <div>
              <img 
                src={logo} 
                className={`rounded-full h-16 border-2 ${borderColor}`} 
                alt="Content Hub Logo" 
              />
            </div>
          </div>
          <p>
            The Content Hub Ltd.
            <br />
            Providing reliable Blog since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className={`link link-hover ${linkColor}`}>Branding</a>
          <a className={`link link-hover ${linkColor}`}>Design</a>
          <a className={`link link-hover ${linkColor}`}>Marketing</a>
          <a className={`link link-hover ${linkColor}`}>Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className={`link link-hover ${linkColor}`}>About us</a>
          <a className={`link link-hover ${linkColor}`}>Contact</a>
          <a className={`link link-hover ${linkColor}`}>Jobs</a>
          <a className={`link link-hover ${linkColor}`}>Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className={`link link-hover ${linkColor}`}>Terms of use</a>
          <a className={`link link-hover ${linkColor}`}>Privacy policy</a>
          <a className={`link link-hover ${linkColor}`}>Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
