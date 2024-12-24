import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { Link } from 'react-router-dom';

const RecentPost = () => {
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

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h1>

      <div className="space-y-4">
        {blogs.map((blog) => (
          
          <Link to={`/blog/${blog._id}`} key={blog._id}>
          <div className="flex items-center gap-4 hover:bg-gray-100 p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
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
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-200">
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
