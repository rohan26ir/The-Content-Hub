import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import NoPost from "../../components/NoPost/NoPost";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { darkMode } = useContext(AuthContext);

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const inputMode = darkMode ? 'bg-[#424242] text-white' : 'bg-white text-black';
  const buttonMode = darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400';

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/allBlogs?filter=${filter === "All" ? "" : filter}&search=${search}&sort=${sort}`
        );
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchAllBlogs();
  }, [filter, search, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger the search functionality
    setSearch(search);
  };

  return (
    <div className={`container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between ${themeMode}`}>

      <Helmet>
        <title>All Blogs | The Content Hub</title>
      </Helmet>

      <div>
        {/* Filter and Search Container */}
        <div className="flex flex-col sm:flex-row sm:justify-around items-center gap-5">
          {/* Filter Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              name="category"
              id="category"
              className={`w-full sm:w-auto border p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputMode}`}
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="" disabled>
                Filter By Category
              </option>
              <option value="All">All Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-auto flex items-center gap-1 border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className={`w-full px-3 py-2 md:px-6 md:py-2 text-gray-700 placeholder-gray-500 rounded-lg outline-none focus:placeholder-transparent ${inputMode}`}
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Enter Blog Title"
              aria-label="Enter Blog Title"
            />
            <button
              onClick={handleSearch}
              className={`px-3 md:px-4 py-2 md:py-3 text-sm font-medium tracking-wider uppercase transition-colors duration-300 transform rounded-lg focus:outline-none ${buttonMode}`}
            >
              Search
            </button>
          </div>
        </div>

        {/* Conditionally Render Blog Cards or NoPost Component */}
        {blogs.length === 0 ? (
          <NoPost />
        ) : (
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
