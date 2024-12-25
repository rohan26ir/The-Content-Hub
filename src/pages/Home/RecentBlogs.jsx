import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

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
      <h2 className="text-2xl font-semibold mb-6">Recent Blogs</h2>

      <div className="grid grid-cols-1 gap-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform"
          >
            {/* Blog Image */}
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-56 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
            </div>

            {/* Blog Title and Description */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
                {blog.title}
              </h3>
              <p className="mt-2 text-md text-gray-600">{blog.shortDescription}</p>
            </div>

            {/* Footer with Buttons */}
            <div className="px-4 py-3 flex justify-between items-center border-t">
              <div>
                <Link to={`/blog/${blog._id}`}>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Details
                  </button>
                </Link>
              </div>
              <div>
                <button
                  className={`px-4 py-2 ${
                    loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'
                  } text-sm font-semibold rounded-md transition duration-300`}
                  disabled={loading}
                  onClick={() => handleAddToWishlist(blog)}
                >
                  {loading ? 'Adding...' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
