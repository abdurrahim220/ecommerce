import { createBrowserRouter } from "react-router-dom";
// import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import Category from "../components/Category/Category";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Login from "../components/UserPage/LoginPage/Login";
import Register from "../components/UserPage/RegisterPage/Register";
import Loader from "../components/Loader/Loader";
import React, { Suspense } from "react";
import Summary from "../dashboard/admin/Summary/Summary";
import Products from "../dashboard/admin/Products/Products";
import Users from "../dashboard/admin/Users/Users";
import Orders from "../dashboard/admin/Orders/Orders";
import CreateProduct from "../dashboard/admin/CreateProduct/CreateProduct";
import DetailsProduct from "../components/Details/DetailsProduct";

import UserProfile from "../components/Details/UserProfile";
import Order from "../components/Details/Order";
import AllItems from "../components/AllItems/AllItems";
import UserOrderDetails from "../components/Details/UserOrderDetails";
import PrivateRoute from "./PrivateRoute";

const DashboardHome = React.lazy(() =>
  import("../dashboard/Layout/DashboardHome")
);

const Main = React.lazy(() => import("../Layout/Main"));
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    ),
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
        path: "/all-items",
        element: <AllItems />,
      },
      {
        path: "/checkout-success",
        element: <Category />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/productDetails/:id",
        element: <DetailsProduct />,
      },
      {
        path: "/productOrder/:id",
        element: <Order />,
      },
      {
        path: "/userProfile/:id",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<Loader />}>
        <DashboardHome />
      </Suspense>
    ),
    children: [
      {
        path: "/dashboard/summary",
        element: (
          <PrivateRoute>
            <Summary />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/products/create",
        element: (
          <PrivateRoute>
            <CreateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/usersOrderDetails",
        element: <UserOrderDetails />,
      },
    ],
  },
]);

export default router;
