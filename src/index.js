import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ProductDetail from "./pages/ProductDetail";
import Basket from "./pages/Basket";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./pages/ProtectedRoute";
import AllProducts from "./pages/AllProducts";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/basket",
        element: (
          <ProtectedRoute>
            <Basket />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/add",
        element: (
          <ProtectedRoute requireAdmin>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
