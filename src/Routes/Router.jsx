import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Error from "../components/Error/Error";
import Home from "../pages/Home/Home";
import AddBlog from "../pages/AddBlog/AddBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import Wishlist from "../pages/Wishlist/Wishlist";
import AccountLayout from "../layouts/AccountLayout/AccountLayout";
import SignUp from "../Account/SingUp";
import SignIn from "../Account/SignIn";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DetailsBlog from "../pages/DetailsBlog/DetailsBlog";
import UpdateBlog from "../pages/Update/UpdateBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: '/Add-Blog',
        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>,
      },
      {
        path: '/All-blogs',
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: '/blog/:id',
        element: <PrivateRoute><DetailsBlog></DetailsBlog></PrivateRoute>
      },
      {
        path: '/Featured-Blogs',
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: "/Wishlist",
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
      },
      {
        path: "/update-blog/:id",
        element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>
      }
    ],
  },
  {
    path: "/Account",
    element: <AccountLayout></AccountLayout>,
    errorElement: <Error></Error>,
    children: [
      
      {
        path: "/Account/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/Account/signin",
        element: <SignIn></SignIn>
      }
    ]
  }
]);

export default router;
