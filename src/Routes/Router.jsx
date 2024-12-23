import {
  createBrowserRouter,
  // RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Error from "../components/Error/Error";
import Home from "../pages/Home/Home";
import AddBlog from "../pages/AddBlog/AddBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import Wishlist from "../pages/Wishlist/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: '/Add-Blog',
        element: <AddBlog></AddBlog>
      },
      {
        path: '/All-blogs',
        element: <AllBlogs></AllBlogs>
      },
      {
        path: '/Featured-Blogs',
        element: <FeaturedBlogs></FeaturedBlogs>
      },
      {
        path: "/Wishlist",
        element: <Wishlist></Wishlist>
      }
    ]
  },
]);

export default router;