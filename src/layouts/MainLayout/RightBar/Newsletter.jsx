import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show toast notification after form submission
    toast.success("Thank you for subscribing to our newsletter!", {
      position: 'top-left',
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: true,
      theme: "colored",
    });

    // Optionally reset the form after submission
    setEmail("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
      <h3 className="font-bold text-2xl text-center mb-4">Newsletter</h3>

      <p className="text-center font-medium text-gray-600 mb-6">
        Join <span className="text-cyan-800 font-bold">70,000</span> subscribers!
      </p>

      <form className="relative" onSubmit={handleSubmit}>
        <label className="relative block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-cyan-800 text-white py-3 mt-4 rounded-lg shadow-md hover:bg-cyan-900 hover:shadow-lg transition-all duration-300"
        >
          Subscribe
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-500">
        By signing up, you agree to our{" "}
        <a href="#" className="text-cyan-800 hover:underline">
          Privacy Policy
        </a>
      </p>

      {/* Toast container to display toast messages */}
      <ToastContainer />
    </div>
  );
};

export default Newsletter;
