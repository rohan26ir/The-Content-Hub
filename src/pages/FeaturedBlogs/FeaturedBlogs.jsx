import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure to import Link
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/featuredBlogs');
      setBlogs(response.data);
    } catch (error) {
      setError('Error fetching featured blogs');
      console.error('Error fetching featured blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row, index) => index + 1, {
      id: 'index',
      header: '#',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => {
        const blog = info.row.original; // Get the full blog object
        return (
          <Link to={`/blog/${blog._id}`} className="text-blue-600 hover:underline">
            {info.getValue()}
          </Link>
        );
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('author.name', {
      header: 'Author',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('wordCount', {
      header: 'Word Count',
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: blogs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        Featured Blogs
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500">No featured blogs available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="py-3 px-6 text-left text-gray-700 font-semibold cursor-pointer"
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="ml-2">
                          {header.column.getIsSorted() === 'asc'
                            ? <BiSolidUpvote />
                            : header.column.getIsSorted() === 'desc'
                            ? <BiSolidDownvote />
                            : '↕'}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-200">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-6 text-gray-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeaturedBlogs;
