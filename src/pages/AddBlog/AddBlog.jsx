import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddBlog = () => {
  const { user, darkMode } = useContext(AuthContext);

  const themeMode = darkMode
    ? "bg-black text-white"
    : "bg-[#FFF5CD] text-black";

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const imageUrl = e.target.imageUrl.value;
    const category = e.target.category.value;
    const shortDescription = e.target.shortDescription.value;
    const longDescription = e.target.longDescription.value;

    const formData = {
      title,
      imageUrl,
      category,
      shortDescription,
      longDescription,
    };

    console.log(formData);

    // Add API integration or further handling here
  };

  return (
    <div className={`max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg ${themeMode}`}>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add New Blog
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
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
          </select>
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <label
            htmlFor="shortDescription"
            className="block font-medium"
          >
            Short Description
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Write a short description (max 150 characters)"
            maxLength={150}
            rows={3}
            required
          ></textarea>
        </div>

        {/* Long Description */}
        <div className="mb-6">
          <label
            htmlFor="longDescription"
            className="block font-medium"
          >
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Write a detailed description"
            rows={6}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
