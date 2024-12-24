import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'; // Import date-fns for relative time
import Loading from '../../components/Loading/Loading';

const DetailsBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const {
    title,
    imageUrl,
    shortDescription,
    longDescription,
    author,
  } = blog || {};

  
  // Scroll to the top when the component renders
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {blog ? (
        <div className="container mx-auto px-4 py-12">
          {/* Blog Header */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center rounded-lg">
              <h1 className="text-white text-4xl font-bold px-6 text-center">{title}</h1>
            </div>
          </div>

          {/* Blog Content */}
          <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                By <span className="font-semibold">{author?.name}</span>
              </p>
              <img
                src={author?.photo}
                alt={author?.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold mt-6">{title}</h2>
            </div>

            <p className="mt-4 text-gray-700 text-lg">{shortDescription}</p>

            <div className="mt-6 border-t pt-4">
              <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                {longDescription}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DetailsBlog;
