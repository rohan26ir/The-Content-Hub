import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const TopBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useAuth();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const hoverClass = darkMode ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-100'; // Hover effect for dark mode

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await axios.get('https://the-content-hub-server.vercel.app/api/featuredBlogs');
      setBlogs(response.data.slice(0, 5)); // Fetch only the first 5 blogs
    } catch (error) {
      setError('Error fetching featured blogs');
      console.error('Error fetching featured blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`p-4 shadow-md rounded-lg ${themeMode}`}>
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Popular Posts</h2>
      <ul>
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
            <li className={`mb-4 flex ${hoverClass}`}>
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-16 h-16 rounded-md object-cover mr-4"
              />
              <div>
                <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} line-clamp-2`}>
                  {blog.title}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {blog.shortDescription.substring(0, 50)}...
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TopBlog;
