import React, { useContext } from "react";
import { format } from "date-fns";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const BlogCard = ({ blog }) => {
  const { user, darkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const cardHover = darkMode ? 'hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900' : 'hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200';

  const { _id, title, imageUrl, category, shortDescription, author, createdAt } =
    blog || {};

  // Function to handle adding to wishlist
  const handleAddToWishlist = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please sign in to add items to your wishlist.",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Account/signin");
        }
      });
      return;
    }

    const wishlistItem = {
      reviewId: _id,
      userEmail: user.email,
      title,
      imageUrl,
      category,
    };

    try {
      await axios.post(
        "https://the-content-hub-server.vercel.app/addWishlist",
        wishlistItem
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Added to wishlist successfully!",
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      Swal.fire({
        icon: "error",
        title: "Check Wishlist",
        text:
          error.response?.data?.message ||
          "Failed to add to wishlist. Please try again later.",
      });
    }
  };

  return (
    <div className={`max-w-sm rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-2xl ${cardHover} flex flex-col ${themeMode}`}>
      {/* Blog Image */}
      <div className="relative group">
        <img
          src={imageUrl}
          alt={title}
          title={title}
          className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Link to={`/blog/${_id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 transform">
              View Post
            </button>
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6 pb-1 flex-1">
        <div className="flex justify-between items-center gap-2">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {createdAt ? format(new Date(createdAt), "PPP") : "Unknown Date"}
          </p>

          <div className="flex items-center gap-2">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <CgProfile />
            </span>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>By {author?.name || "Unknown Author"}</span>
          </div>
        </div>
        {/* End */}
        <h2 className={`mt-2 text-xl font-semibold hover:text-blue-600 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </h2>
        <p className={`mt-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{shortDescription}</p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-2 flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-blue-500 uppercase">
             {category}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 py-4 flex justify-between text-center bg-gray-50 rounded-b-xl gap-2">
        <div className="w-1/2">
          <Link to={`/blog/${_id}`}>
            <p className={`px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-lg transform transition-all hover:bg-blue-600 hover:scale-105`}>
              Details
            </p>
          </Link>
        </div>
        <div className="w-1/2">
          <button
            className={`px-4 py-2 bg-gray-300 text-sm font-semibold rounded-md shadow-lg transform transition-all hover:bg-gray-400 hover:scale-105 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}`}
            onClick={handleAddToWishlist}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
