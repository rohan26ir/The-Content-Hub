import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const AddBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, darkMode } = useAuth();
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (newBlog) => {
      await axiosSecure.post('/api/addBlog', newBlog);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to add blog');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const imageUrl = form.imageUrl.value;
    const category = form.category.value;

    const blogData = {
      title,
      imageUrl,
      category,
      shortDescription,
      longDescription,
      author: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
      createdAt: new Date(),
    };

    try {
      await mutateAsync(blogData); // Pass correct data to mutation
      toast.success('Blog added successfully!');
      form.reset();
      setShortDescription('');
      setLongDescription('');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add blog');
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen py-12 ${themeMode}`}>
      <Helmet>
        <title>Add Blog | The Content Hub</title>
      </Helmet>
      <section className={`p-6 mx-auto rounded-md shadow-md w-11/12 ${darkMode ? 'bg-[#333] border border-[#444]' : 'bg-white'}`}>
        <h2 className={`text-lg font-semibold capitalize text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          Add a New Blog
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
            <div>
              <label className={`text-gray-700 ${darkMode ? 'text-white' : ''}`} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 ${darkMode ? 'bg-[#444] text-white border-gray-600' : 'bg-white border-gray-200'} border rounded-md focus:outline-none`}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div>
              <label className={`text-gray-700 ${darkMode ? 'text-white' : ''}`} htmlFor="imageUrl">
                Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 ${darkMode ? 'bg-[#444] text-white border-gray-600' : 'bg-white border-gray-200'} border rounded-md focus:outline-none`}
                placeholder="Enter image URL"
                required
              />
            </div>

            <div>
              <label className={`text-gray-700 ${darkMode ? 'text-white' : ''}`} htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 ${darkMode ? 'bg-[#444] text-white border-gray-600' : 'bg-white border-gray-200'} border rounded-md focus:outline-none`}
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className={`text-gray-700 ${darkMode ? 'text-white' : ''}`} htmlFor="shortDescription">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 ${darkMode ? 'bg-[#444] text-white border-gray-600' : 'bg-white border-gray-200'} border rounded-md focus:outline-none`}
              placeholder="Write a short description (max 200 characters)"
              maxLength={150}
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className={`text-gray-700 ${darkMode ? 'text-white' : ''}`} htmlFor="longDescription">
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 ${darkMode ? 'bg-[#444] text-white border-gray-600' : 'bg-white border-gray-200'} border rounded-md focus:outline-none`}
              placeholder="Write a detailed description"
              rows={6}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className={`px-8 py-2.5 text-white transition-colors duration-300 transform rounded-md ${isPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isPending}
            >
              {isPending ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddBlog;
