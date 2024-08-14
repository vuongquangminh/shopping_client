import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import "./index.css";
import PrivateOutlet from "./components/RoutePrivate/PrivateOutlet";
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const ErrorPage = lazy(() => import("./components/error-page.jsx"));
const UserPage = lazy(() => import("./pages/Admin/User/UserPage.jsx"));
const DetailPage = lazy(() => import("./pages/Admin/User/DetailPage.jsx"));

const ProductPage = lazy(() => import("./pages/Admin/Product/ProductPage.jsx"));
const TypeProductPage = lazy(() =>
  import("./pages/Admin/Product/TypeProductPage.jsx")
);

const OrderPage = lazy(() => import("./pages/Admin/Order/OrderPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dang-ky",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <PrivateOutlet role="admin" />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <div>Dashboard</div> },
      {
        path: "user",
        children: [
          {
            path: "",
            element: <UserPage />,
          },
          {
            path: ":id",
            element: <DetailPage />,
          },
        ],
      },
      {
        path: "type-product",
        children: [
          {
            path: "",
            element: <TypeProductPage />,
          },
        ],
      },
      {
        path: "product",
        children: [
          {
            path: "",
            element: <ProductPage />,
          },
        ],
      },
      {
        path: "order",
        children: [
          {
            path: "",
            element: <OrderPage />,
          },
          {
            path: ":id",
            element: <OrderPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Đang tải...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
