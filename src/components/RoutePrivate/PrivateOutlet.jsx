import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./useAuth"; // Đảm bảo đường dẫn đúng với file chứa hook
import { Spin } from "antd";
import ErrorPage from "../error-page";

function PrivateOutlet({ role }) {
  const { user, loading } = useAuth();

  // Nếu đang tải dữ liệu, hiển thị thông báo loading

  if (loading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100ch" }}
      >
        <Spin />
      </div>
    );
  }
  if (user?.role_name !== role) {
    <Navigate to="/" />;
  }
  // Nếu có người dùng, render các route con; nếu không, chuyển hướng về trang chính
  return role.includes(user?.role_name) ? <Outlet /> : <ErrorPage />;
}

export default PrivateOutlet;
