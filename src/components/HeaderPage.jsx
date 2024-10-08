import React, { memo, useState } from "react";
import {
  FundViewOutlined,
  IssuesCloseOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  SignatureOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Menu, Space, Tooltip } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo360 from "../assets/360.png";
import useAuth from "./RoutePrivate/useAuth";

const items = [
  {
    label: "Quản lý người dùng",
    key: "/admin/user",
    icon: <UsergroupAddOutlined />,
  },
  {
    label: "Quản lý loại sản phẩm",
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
const HeaderPage = ({ urlPath, noUser, countCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);
  const { user } = useAuth();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "infor":
        user?.role_name === "admin"
          ? navigate(`/admin/user/${user.id}`)
          : navigate(`/user/${user.id}`);
        break;
      case "password":
        navigate("/doi-mat-khau");
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
            {!noUser && user?.role_name === "customer" && (
              <>
                <Tooltip title="Giỏ hàng">
                  <Link to={"/gio-hang"}>
                    <Badge size="default" count={countCart}>
                      <Button type="text">
                        <ShoppingCartOutlined />
                      </Button>
                    </Badge>
                  </Link>
                </Tooltip>
                <Tooltip title="Đơn hàng" className="mx-2">
                  <Button type="text">
                    <SendOutlined />
                  </Button>
                </Tooltip>
              </>
            )}
            <Space wrap>
              <Dropdown
                menu={{
                  items: account,
                  onClick: handleMenuClick,
                }}
                placement="bottomRight"
                arrow
              >
                <div className="flex flex-col items-center">
                  <Button>
                    <UserOutlined />
                  </Button>
                  {user?.name}
                </div>
              </Dropdown>
            </Space>
          </h4>
        </div>
      </div>
    </>
  );
};
export default memo(HeaderPage);
