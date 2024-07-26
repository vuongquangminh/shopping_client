import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ErrorPage from "./components/error-page";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminProduct from "./pages/Admin/product";
import GridExample from "./pages/Admin/content";

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
    path: "/admin/product",
    element: <AdminProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
