import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/featuredBlogs');
      setBlogs(response.data);
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

  console.log(blogs);

  // const {_id, title, imageUrl, shortDescription, longDescription, author } = blogs || {};

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        Featured Blogs
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500">No featured blogs available.</div>
      ) : (

        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">#</th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">Title</th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">Category</th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">Author</th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">Word Count</th>
              </tr>
            </thead>


            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-6 text-blue-600 font-semibold hover:underline">
                    {blog.title}
                  </td>
                  <td className="py-3 px-6 text-gray-600">{blog.category}</td>
                  <td className="py-3 px-6 text-gray-600">{blog.author.name}</td>
                  <td className="py-3 px-6 text-gray-600">{blog.wordCount}</td>
                </tr>
              ))}
            </tbody>



          </table>
        </div>



      )}
    </div>
  );
};

export default FeaturedBlogs;
