import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsBlog = () => {

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]); // Fetch when ID changes

  // Display a loading message while fetching the data
  if (!blog) {
    return <div>Loading...</div>;
  }

  console.log("blog in details:", blog);

  return (
    <div>
      
    </div>
  );
};

export default DetailsBlog;