import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RecentPost = () => {
  const [blogs, setBlogs] = useState([]);
  const { darkMode } = useAuth();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const cardHover = darkMode ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-100'; // Adjust hover effect for dark mode

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
    <div className={`container py-6 ${themeMode}`}>
      <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Recent Posts
      </h1>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
            <div className={`flex items-center gap-4 p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform ${cardHover}`}>
              {/* Blog Image */}
              <div className="flex-shrink-0">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-20 h-20 object-cover rounded-lg" 
                />
              </div>

              {/* Blog Title */}
              <div className="flex-1">
                <h3 className={`text-lg font-semibold transition duration-200 ${darkMode ? 'text-white hover:text-blue-500' : 'text-gray-800 hover:text-blue-500'}`}>
                  {blog.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPost;
