import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import PrivateOutlet from "./components/RoutePrivate/PrivateOutlet";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./components/error-page";
import UserPage from "./pages/Admin/User/UserPage";
import DetailPage from "./pages/Admin/User/DetailPage";
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const RegisterPage = lazy(() => import("./pages/RegisterPage"));
// const ErrorPage = lazy(() => import("./components/error-page"));
// const UserPage = lazy(() => import("./pages/Admin/User/UserPage"));
// const DetailPage = lazy(() => import("./pages/Admin/User/DetailPage"));

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
        element: <UserPage />,
      },
      {
        path: "user/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
