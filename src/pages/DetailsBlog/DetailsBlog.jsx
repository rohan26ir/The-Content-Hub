import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import ShareButtons from '../../components/Social/ShareButtons';
import Author from '../../components/Author/Author';
import Comment from '../../components/Comment/Comment';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet';

const DetailsBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user details
  const [blog, setBlog] = useState(null);
  const { darkMode } = useAuth();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const cardBg = darkMode ? 'bg-[#424242]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const headerBg = darkMode ? 'bg-[#424242]' : 'bg-blue-100';

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://the-content-hub-server.vercel.app/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const {
    _id,
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

  // Check if the logged-in user is the blog owner
  const isBlogOwner = user?.email === author?.email;

  return (
    <div className={`min-h-screen ${headerBg}`}>
      <Helmet>
        <title>Details | The Content Hub</title>
      </Helmet>

      {blog ? (
        <div className={`container mx-auto px-4 py-12 ${themeMode}`}>
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
          <div className={`mt-8 shadow-lg rounded-lg p-6 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm ${textColor}`}>
                By <span className="font-semibold">{author?.name}</span>
              </p>
              <img
                src={author?.photo}
                alt={author?.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
            </div>

            <div>
              <h2 className={`text-4xl font-bold mt-6 ${textColor}`}>{title}</h2>
            </div>

            <p className={`mt-4 ${textColor} text-lg`}>{shortDescription}</p>

            <div className="mt-6 border-t pt-4">
              <p className={`text-base leading-relaxed whitespace-pre-line ${textColor}`}>
                {longDescription}
              </p>
            </div>
          </div>

          {/* Update Button */}
          <div className='flex justify-center -mt-8 mb-5'>
            {isBlogOwner && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigate(`/update-blog/${id}`)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-800 font-bold"
                >
                  Update Blog
                </button>
              </div>
            )}
          </div>

          {/* Author and Share Buttons */}
          <div className="flex flex-col md:flex-row mt-16 justify-between items-center">
            <div>
              <Author key={_id} blog={blog}></Author>
            </div>

            <div>
              <ShareButtons key={_id} id={_id}></ShareButtons>
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <Comment blogOwnerEmail={author?.email} blogId={_id} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DetailsBlog;
