import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import Category from "../components/Category/Category";
import SingleProduct from "../components/SingleProduct/SingleProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
    ],
  },
]);

export default router;
