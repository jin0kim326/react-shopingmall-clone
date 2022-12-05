import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Basket from './pages/Basket';
import AddProduct from './pages/AddProduct';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <Products />
      },
      {
        path:"/products/:id",
        element: <ProductDetail />
      },
      {
        path: "/basket/:id",
        element: <Basket />
      },
      {
        path: "/product/add",
        element: <AddProduct />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

