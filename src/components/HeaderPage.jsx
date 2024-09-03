import React, { useState } from "react";
import {
  FundViewOutlined,
  IssuesCloseOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  SignatureOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import logo360 from "../assets/360.png";

const items = [
  {
    label: "Quản lý người dùng",
    key: "/admin/user",
    icon: <UsergroupAddOutlined />,
  },
  {
    label: "Quản lý loại phẩm",
    key: "/admin/type-product",
    icon: <ProfileOutlined />,
  },
  {
    label: "Quản lý sản phẩm",
    key: "/admin/product",
    icon: <OrderedListOutlined />,
  },
  {
    label: "Quản lý đơn hàng",
    key: "/admin/order",
    icon: <IssuesCloseOutlined />,
  },
  {
    label: "Doanh thu bán hàng",
    key: "/admin/doanh-thu/product",
    icon: <FundViewOutlined />,
  },
];
const account = [
  {
    label: "Thông tin tài khoản",
    key: "infor",
    icon: <SolutionOutlined />,
  },
  {
    label: "Đổi mật khẩu",
    key: "password",
    icon: <SignatureOutlined />,
  },
  {
    label: "Đăng xuất",
    key: "logout",
    icon: <LogoutOutlined />,
  },
];
const HeaderPage = ({ urlPath }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  const handleMenuClick = (e) => {
    console.log("e: ", e);
    switch (e.key) {
      case "infor":
        // Xử lý khi nhấp vào Profile
        break;
      case "password":
        // Xử lý khi nhấp vào Settings
        break;
      case "logout":
        localStorage.removeItem("authToken");
        navigate("/");
        // Xử lý khi nhấp vào Logout
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="p-5 flex items-center border-b border-solid border-gray-300">
        <div
          className="w-16 flex justify-center bg-transparent cursor-pointer"
          onClick={() => navigate("/admin/user")}
        >
          <img src={logo360} alt="" />
        </div>
        <div className="flex items-center w-full mx-3">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={urlPath ? urlPath : items}
            className="grow"
          />
          <h4 className=" text-end">
            <Space wrap>
              <Dropdown
                menu={{
                  items: account,
                  onClick: handleMenuClick,
                }}
                placement="bottomRight"
                arrow
              >
                <Button>
                  <UserOutlined />
                </Button>
              </Dropdown>
            </Space>
          </h4>
        </div>
      </div>
    </>
  );
};
export default HeaderPage;
