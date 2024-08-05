import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import PrivateOutlet from "./components/RoutePrivate/PrivateOutlet";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ErrorPage = lazy(() => import("./components/error-page"));
const UserPage = lazy(() => import("./pages/Admin/User/UserPage"));
const DetailPage = lazy(() => import("./pages/Admin/User/DetailPage"));

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
      { path: "", element: <>Dasboard</> },
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
