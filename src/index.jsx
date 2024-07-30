import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ErrorPage from "./components/error-page";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateOutlet from "./components/RoutePrivate/PrivateOutlet";
import UserPage from "./pages/Admin/UserPage";

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
    children: [
      { path: "", element: <>aaaaaaa</> },
      { path: "product", element: <UserPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
