import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, darkMode } = useAuth();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const inputBg = darkMode ? 'bg-[#424242]' : 'bg-white';
  const inputTextColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const buttonBg = darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700';
  const buttonDisabled = darkMode ? 'cursor-not-allowed bg-gray-400' : 'cursor-not-allowed bg-gray-400';

  const [blogData, setBlogData] = useState({
    title: '',
    imageUrl: '',
    category: '',
    shortDescription: '',
    longDescription: '',
  });

  // Fetch existing blog details
  const { data: blog, isLoading: isBlogLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/blog/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      setBlogData({
        title: data.title,
        imageUrl: data.imageUrl,
        category: data.category,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
      });
    },
    onError: () => {
      toast.error('Failed to fetch blog details.');
    },
  });

  // Update blog mutation
  const { mutateAsync: updateBlog, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
      await axiosSecure.put(`/api/blog/${id}`, updatedData);
    },
    onSuccess: () => {
      toast.success('Blog updated successfully!');
      navigate(`/blog/${id}`);
    },
    onError: () => {
      toast.error('Failed to update blog.');
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog(blogData);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Authorization check
  if (!isBlogLoading && blog?.author.email !== user?.email) {
    return <p className="text-center text-red-500">You are not authorized to edit this blog.</p>;
  }

  if (isBlogLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`flex justify-center items-center min-h-screen ${themeMode}`}>

      <Helmet>
        <title>Update | The Content Hub</title>
      </Helmet>

      <section className={`p-6 rounded-md shadow-md w-11/12 mx-auto ${themeMode}`}>
        <h2 className="text-lg font-semibold capitalize text-center mb-6">Update Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className={`text-gray-700 ${inputTextColor}`}>
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={blogData.title}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-2 ${inputTextColor} ${inputBg} border ${borderColor} rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none`}
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className={`text-gray-700 ${inputTextColor}`}>
                Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                value={blogData.imageUrl}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-2 ${inputTextColor} ${inputBg} border ${borderColor} rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none`}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className={`text-gray-700 ${inputTextColor}`}>
                Category
              </label>
              <select
                id="category"
                name="category"
                value={blogData.category}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-2 ${inputTextColor} ${inputBg} border ${borderColor} rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none`}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="shortDescription" className={`text-gray-700 ${inputTextColor}`}>
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={blogData.shortDescription}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-2 ${inputTextColor} ${inputBg} border ${borderColor} rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none`}
                maxLength={150}
                rows={2}
                required
              />
            </div>

            <div>
              <label htmlFor="longDescription" className={`text-gray-700 ${inputTextColor}`}>
                Long Description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                value={blogData.longDescription}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-2 ${inputTextColor} ${inputBg} border ${borderColor} rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none`}
                rows={6}
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`px-6 py-2 text-white ${buttonBg} rounded-md hover:bg-blue-700 ${isUpdating ? buttonDisabled : ''}`}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateBlog;
