import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import NoPost from "../../components/NoPost/NoPost";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

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

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="flex flex-col md:flex-row justify-around items-center gap-5">
          <div>
            <select
              name="category"
              id="category"
              className="border p-4 rounded-lg"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="" disabled>Filter By Category</option>
              <option value="All">All Category</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Enter Blog Title"
              aria-label="Enter Blog Title"
            />
            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </div>

        {/* Conditionally Render Blog Cards or NoPost Component */}
        {blogs.length === 0 ? (
            <NoPost></NoPost>
          ) : (
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            )
          )}
        </div>
          )}
        {/* <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            )
          )}
        </div> */}


      </div>
    </div>
  );
};

export default AllBlogs;
