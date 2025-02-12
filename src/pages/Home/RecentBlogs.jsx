import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';  // Import SweetAlert2

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, darkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  // Conditional theme classes based on dark mode
  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const buttonTheme = darkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-300 hover:bg-gray-400';
  const textColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const titleColor = darkMode ? 'text-white' : 'text-gray-800';
  const hoverTitleColor = darkMode ? 'hover:text-blue-400' : 'hover:text-blue-500';

  useEffect(() => {
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

  const handleAddToWishlist = async (blog) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'Please sign in to add items to your wishlist.',
        confirmButtonText: 'Go to Sign In',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/Account/signin');
        }
      });
      return;
    }

    setLoading(true);
    const wishlistItem = {
      reviewId: blog._id,
      userEmail: user.email,
      title: blog.title,
      imageUrl: blog.imageUrl,
    };

    try {
      await axios.post('https://the-content-hub-server.vercel.app/addWishlist', wishlistItem);
      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist',
        text: 'The blog has been added to your wishlist successfully!',
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add',
        text: error.response?.data?.message || 'Something went wrong.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="blogs-section" className={`container py-8 px-4 md:px-8 mx-auto ${themeMode}`}>
      <motion.div
        className="grid grid-cols-1 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            className={`rounded-lg shadow-lg transition-shadow duration-300 ease-in-out transform ${themeMode}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Blog Image */}
            <motion.div
              className="overflow-hidden rounded-t-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
            </motion.div>

            {/* Blog Title and Description */}
            <div className="p-4">
              <h3 className={`text-xl font-semibold ${titleColor} ${hoverTitleColor} transition-colors duration-200`}>
                {blog.title}
              </h3>
              <p className={`mt-2 text-md ${textColor}`}>{blog.shortDescription}</p>
            </div>

            {/* Footer with Buttons */}
            <div className="px-4 py-3 flex justify-between items-center border-t border-gray-300">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={`/blog/${blog._id}`}>
                  <button className={`px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300`}>
                    Details
                  </button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={`px-4 py-2 ${loading ? 'bg-gray-300 cursor-not-allowed' : buttonTheme} text-sm font-semibold rounded-md transition duration-300`}
                  disabled={loading}
                  onClick={() => handleAddToWishlist(blog)}
                >
                  {loading ? 'Adding...' : 'Add to Wishlist'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecentBlogs;
