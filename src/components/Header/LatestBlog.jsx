import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LatestBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { darkMode } = useAuth();

  // Conditional theme class for dark mode
  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const titleTheme = darkMode ? 'bg-rose-600 text-white' : 'bg-rose-500 text-white';
  const textLinkColor = darkMode ? 'text-blue-400' : 'text-blue-600';
  const textLinkHoverColor = darkMode ? 'hover:text-blue-600' : 'hover:text-blue-800';

  useEffect(() => {
    // Fetch latest blogs from the backend
    const fetchLatestBlogs = async () => {
      try {
        const { data } = await axios.get('https://the-content-hub-server.vercel.app/api/latestBlogs');
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <div className={`px-2 md:px-6 lg:px-10 my-4 ${themeMode}`}>
      {/* Title Section */}
      <div className="flex items-center gap-2">
        <p className={`px-4 py-1 rounded-md text-sm font-semibold shadow-lg ${titleTheme}`}>
          Latest:
        </p>
        {/* Marquee Section */}
        <div className="flex-1 overflow-hidden">
          <Marquee pauseOnHover={true} speed={50}  gradientWidth={50}>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <p
                  key={blog._id}
                  className={`mx-4 ${textLinkColor} ${textLinkHoverColor} font-medium transition duration-300`}
                >
                  <Link to={`/blog/${blog._id}`}>
                    <li>{blog.title}</li>
                  </Link>
                </p>
              ))
            ) : (
              <span className="loading loading-ring loading-lg"></span>
            )}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
