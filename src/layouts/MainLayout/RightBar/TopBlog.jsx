import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/featuredBlogs');
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
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Posts</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="mb-4 flex">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-16 h-16 rounded-md object-cover mr-4"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-700 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-xs text-gray-500">
                {blog.shortDescription.substring(0, 50)}...
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopBlog;
