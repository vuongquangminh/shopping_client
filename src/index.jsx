import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import "./index.css";
import PrivateOutlet from "./components/RoutePrivate/PrivateOutlet";
import request from "./utils/request.js";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const ErrorPage = lazy(() => import("./components/error-page.jsx"));
const UserPage = lazy(() => import("./pages/Admin/User/UserPage.jsx"));
const DetailPage = lazy(() => import("./pages/Admin/User/DetailPage.jsx"));
const ProductPage = lazy(() => import("./pages/Admin/Product/ProductPage.jsx"));
const TrangChuPage = lazy(() => import("./pages/PublicPage/TrangChuPage.jsx"));
const ProductView = lazy(() => import("./pages/User/ProductView.jsx"));
const Cart = lazy(() => import("./pages/User/Cart.jsx"));
const ProductViewDetail = lazy(() =>
  import("./pages/PublicPage/ProductViewDetail.jsx")
);
const TypeProductPage = lazy(() =>
  import("./pages/Admin/Product/TypeProductPage.jsx")
);
const DoiMatKhau = lazy(() => import("./pages/Admin/DoiMatKhau.jsx"));
const DoanhThuPage = lazy(() =>
  import("./pages/Admin/DoanhThu/DoanhThupage.jsx")
);
const DetailOrderPage = lazy(() =>
  import("./pages/Admin/Order/DetailOrderPage.jsx")
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
            element: <DetailOrderPage />,
          },
        ],
      },
      {
        path: "doanh-thu/product",
        element: <DoanhThuPage />,
      },
    ],
  },
  {
    path: "trang-chu",
    element: <TrangChuPage />,
  },
  {
    path: "doi-mat-khau",
    element: <DoiMatKhau />,
  },
  {
    element: <PrivateOutlet role={["customer", "admin"]} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "danh-sach-san-pham",
        children: [
          {
            path: "",
            element: <ProductView />,
          },
          {
            path: ":id",
            element: <ProductViewDetail />,
            loader: async ({ params }) => {
              return request.get(`product/${params.id}`);
            },
          },
        ],
      },
      {
        path: "gio-hang",
        children: [
          {
            path: "",
            element: <Cart />,
            loader: async () => {
              const user = await request.get("auth/user");
              return user;
            },
          },
          {
            path: ":id",
            element: <ProductViewDetail />,
            loader: async ({ params }) => {
              return request.get(`product/${params.id}`);
            },
          },
        ],
      },
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
    <React.Suspense fallback={<div>Đang tải...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
