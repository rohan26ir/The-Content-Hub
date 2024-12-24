import React from "react";
import { format } from "date-fns";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, imageUrl, category, shortDescription, author, createdAt } =
    blog || {};

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 flex flex-col">
      {/* Blog Image */}
      <div className="relative group">
        <img
          src={imageUrl}
          alt={title}
          title={title}
          className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ">
          <Link to={`/blog/${blog._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 transform">
            View Post
          </button>
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6 pb-1 flex-1">
        <div className="flex justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            {createdAt ? format(new Date(createdAt), "PPP") : "Unknown Date"}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              <CgProfile />
            </span>
            <span className="text-xs text-gray-600">By {author.name}</span>
          </div>
        </div>
        {/* End */}
        <h2 className="mt-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {title}
        </h2>
        <p className="mt-3 text-sm text-gray-600">{shortDescription}</p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-2 flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-blue-500 uppercase">
           <span className="text-rose-600">Category:</span> {category}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 py-4 flex justify-between text-center bg-gray-50 rounded-b-xl gap-2">
        <div className="w-1/2">
        <Link to={`/blog/${blog._id}`}>
        <p className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-lg transform transition-all hover:bg-blue-600 hover:scale-105">
          Details
        </p>
        </Link>
        </div>
        <div className="w-1/2">
        <Link>
        <p className="px-4 py-2 bg-gray-300 text-sm font-semibold rounded-md shadow-lg transform transition-all hover:bg-gray-400 hover:scale-105">
          Add to Wishlist
        </p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
