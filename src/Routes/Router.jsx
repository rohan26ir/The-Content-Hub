import {
  createBrowserRouter,
  // RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Error from "../components/Error/Error";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      
      {
        path: "/",
        element: <Home></Home>
      }
    ]
  },
]);

export default router;