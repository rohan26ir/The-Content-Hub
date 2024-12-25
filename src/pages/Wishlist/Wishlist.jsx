import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All'); // State to track category filter

  const { user } = useContext(AuthContext);
  const userEmail = `${user.email}`;

  const fetchWishlist = async (category = 'All') => {
    try {
      const response = await axios.get('http://localhost:8000/getWishlist', {
        params: { email: userEmail, category },
      });
      setWishlist(response.data);
    } catch (error) {
      setError('Error fetching wishlist');
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchWishlist(filter);
  }, [userEmail, filter]);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await axios.delete('http://localhost:8000/removeWishlist', {
        params: { email: userEmail, itemId },
      });

      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== itemId));

      alert('Item removed from wishlist successfully!');
    } catch (error) {
      setError('Error removing item from wishlist');
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="container py-8 px-4 md:px-8 mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Your Wishlist</h2>

      


      {/* Category Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          name="category"
          id="category"
          className="border p-4 rounded-lg"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="" disabled>Filter By Category</option>
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : wishlist.length === 0 ? (
        <div className="text-center text-gray-500">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {wishlist.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform relative flex"
            >
              {/* Left side: Item Image */}
              <div className="w-1/3 overflow-hidden rounded-l-lg">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
              </div>

              {/* Right side: Content */}
              <div className="flex flex-col justify-between w-2/3 p-4">
                {/* Title */}
                <div className="flex justify-center items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                {/* Card Number */}
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold rounded-full px-3 py-1">
                  #{index + 1}
                </div>

                {/* Short description */}
                <p className="mt-2 text-md text-gray-600">{item.shortDescription}</p>

                {/* Category and Details */}
                <div className="mt-4 text-sm text-gray-500">
                  <p>Category: <span className="font-semibold">{item.category || 'Uncategorized'}</span></p>
                  <p>Author: <span className="font-semibold">{item.author || 'Unknown'}</span></p>
                  <p>Published on: <span className="font-semibold">{item.publishDate || 'N/A'}</span></p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    className="px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => handleRemoveFromWishlist(item._id)}
                  >
                    Remove
                  </button>
                  <Link to={`/blog/${item.reviewId}`}>
                    <button
                      className="px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
