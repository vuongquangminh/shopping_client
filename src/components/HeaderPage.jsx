import React, { useState } from "react";
import {
  FundViewOutlined,
  IssuesCloseOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, Tooltip } from "antd";
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
    key: "/admin/danh_thu",
    icon: <FundViewOutlined />,
  },
];
const HeaderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <>
      <div className="p-5 flex items-center border-b border-solid border-gray-300">
        <div className="w-16 flex justify-center bg-transparent">
          <img src={logo360} alt="" />
        </div>
        <div className="flex items-center w-full mx-3">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className="grow"
          />
          <h4 className=" text-end">
            <Tooltip placement="top" title={"Tài khoản"}>
              <Button>
                <UserOutlined />
              </Button>
            </Tooltip>
          </h4>
        </div>
      </div>
    </>
  );
};
export default HeaderPage;
