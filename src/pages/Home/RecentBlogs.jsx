import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { motion } from 'framer-motion';

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
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

  const handleAddToWishlist = async (blog) => {
    setLoading(true);
    const wishlistItem = {
      reviewId: blog._id,
      userEmail: user.email,
      title: blog.title,
      imageUrl: blog.imageUrl,
    };

    try {
      const response = await axios.post('http://localhost:8000/addWishlist', wishlistItem);
      alert('Added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert(error.response?.data?.message || 'Failed to add to wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 px-4 md:px-8 mx-auto">

      <motion.div
        className="grid grid-cols-1 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg transition-shadow duration-300 ease-in-out transform"
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
              <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
                {blog.title}
              </h3>
              <p className="mt-2 text-md text-gray-600">{blog.shortDescription}</p>
            </div>

            {/* Footer with Buttons */}
            <div className="px-4 py-3 flex justify-between items-center border-t">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={`/blog/${blog._id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                    Details
                  </button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={`px-4 py-2 ${
                    loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'
                  } text-sm font-semibold rounded-md transition duration-300`}
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
