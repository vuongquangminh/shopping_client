import React, { useState } from "react";
import {
  EnvironmentOutlined,
  InfoCircleOutlined,
  PercentageOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, Tooltip } from "antd";

import logo360 from "../assets/360.png";

const items = [
  {
    label: "Giới thiệu",
    key: "info",
    icon: <InfoCircleOutlined />,
  },
  {
    label: "Danh sách",
    key: "product",
    icon: <UnorderedListOutlined />,
    children: [
      {
        type: "so_mi_dai",
        label: "Sơ mi dài",
      },
      {
        type: "polo",
        label: "Polo",
      },
      {
        type: "ao_phong",
        label: "Áo Phông",
      },
      {
        type: "quan_short",
        label: "Quần short",
      },
      {
        type: "quan_au",
        label: "Quần âu",
      },
      {
        type: "quan_jean",
        label: "Quần Jean",
      },
      {
        type: "quan_kaki",
        label: "Quần kaki",
      },
      {
        type: "quan_jogger",
        label: "Quần jogger",
      },
    ],
  },
  {
    label: "Sale",
    key: "sale",
    icon: <PercentageOutlined />,
    children: [
      {
        type: "99",
        label: "Đồng giá 99k",
      },
      {
        type: "199",
        label: "Đồng giá 199k",
      },
      {
        type: "299",
        label: "Đồng giá 299k",
      },
      {
        type: "599",
        label: "Đồng giá 599k",
      },
    ],
  },
  {
    label: "Hệ thống cửa hàng",
    key: "he_thong_cua_hang",
    icon: <EnvironmentOutlined />,
  },
];
const HeaderPage = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
          />
          <h4 className=" grow text-end">
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
