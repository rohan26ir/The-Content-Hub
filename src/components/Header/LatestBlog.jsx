import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch latest blogs from the backend
    const fetchLatestBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/latestBlogs');
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  // 
  

  return (
    <div className="px-4 my-4">
      {/* Title Section */}
      <div className="flex items-center gap-2">
        <p className="bg-rose-600 text-white px-4 py-1 rounded-md text-sm font-semibold shadow-lg">
          Latest:
        </p>
        {/* Marquee Section */}
        <div className="flex-1 overflow-hidden">
          <Marquee pauseOnHover={true} speed={50} gradient={true} gradientWidth={50}>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <p
                  key={blog._id}
                  href={`/blog/${blog._id}`}
                  className="mx-4 text-blue-600 hover:text-blue-800 font-medium transition duration-300"
                >
                  <Link to={`/blog/${blog._id}`}>
                  <li>{blog.title}</li>
                  </Link>
                </p>
              ))
            ) : (
              <span>Loading latest blogs...</span>
            )}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
