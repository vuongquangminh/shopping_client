import { Avatar, Breadcrumb, Card, ColorPicker } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { BarChartOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import HeaderPage from "../../components/HeaderPage";
import request from "../../utils/request";

const DetailPage = () => {
  const loader = useLoaderData();
  const [chips, setChips] = useState([]);
  const [dungLuongs, setDungLuongs] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    const getListChips = async () => {
      const res = await request.post("list-chips", {
        type_product_id: loader.data[0].type_product_id,
      });
      res.data && setChips(res.data);
    };
    const getListDungLuongs = async () => {
      const res = await request.get("list-dung-luongs", {
        type_product_id: loader.data[0].type_product_id,
      });
      res.data && setDungLuongs(res.data);
    };
    const getListMauSacs = async () => {
      const res = await request.post("list-mau-sacs", {
        type_product_id: loader.data[0].type_product_id,
      });
      res.data && setMauSacs(res.data);
    };
    getListChips();
    getListDungLuongs();
    getListMauSacs();
  }, []);
  console.log("mauSac: ", mauSacs);
  useEffect(() => {
    const description = [
      {
        key: "1",
        label: "Tên sản phẩm",
        children: loader.data[0]?.name,
      },
      {
        key: "2",
        label: "Loại thương hiệu",
        children: loader.data[0]?.type_product.name,
      },
      {
        key: "3",
        label: "Chip",
        children: loader.data[0]?.chip.name,
      },
      {
        key: "4",
        label: "Màn hình",
        children: loader.data[0]?.man_hinh,
      },

      {
        key: "5",
        label: "Dung lượng",
        children: loader.data[0]?.man_hinh,
      },
      {
        key: "6",
        label: "Camera",
        children: loader.data[0]?.camera,
      },

      {
        key: "7",
        label: "Pin",
        children: loader.data[0]?.pin,
      },
      {
        key: "8",
        label: "Bảo mật",
        children: loader.data[0]?.bao_mat,
      },
      {
        key: "9",
        label: "Chống nước",
        children: loader.data[0]?.chong_nuoc,
      },
      {
        key: "10",
        label: "Màu sắc",
        children: <ColorPicker value={loader.data[0]?.mau_sac} disabled />,
      },
      {
        key: "11",
        label: "Mô tả",
        children: loader.data[0]?.description,
      },
    ];
    setDescription(description);
  }, [mauSacs, dungLuongs]);

  const pathHeader = useMemo(() => {
    const results = [
      {
        label: "Danh sách sản phẩm",
        key: "/admin/doanh-thu/product",
        icon: <BarChartOutlined />,
      },
      {
        label: "Khuyến mại",
        key: "/admin/doanh-thu/product",
        icon: <BarChartOutlined />,
      },
      {
        label: "Đơn hàng",
        key: "/admin/doanh-thu/product",
        icon: <BarChartOutlined />,
      },
    ];
    return results;
  }, []);

  return (
    <>
      <HeaderPage urlPath={pathHeader} />

      <div className="m-5">
        <Breadcrumb
          items={[
            {
              title: "Danh sách sản phẩm",
              href: "/danh-sach-san-pham",
            },
            {
              title: "Chi tiết",
            },
            {
              title: loader.data[0]?.name,
            },
          ]}
        />
        <div className="flex justify-center mt-8">
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={
                  loader.data[0]?.image
                    ? `http://localhost:8000${loader.data[0]?.image}`
                    : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fimages%2Fdefault-avatar-profile-icon-vector-social-media-user-image%2F346839683&psig=AOvVaw3nhNZvbYMGeIJXcmpTQ4-W&ust=1726200308518000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDQibTDvIgDFQAAAAAdAAAAABAE"
                }
              />
            }
            actions={[<EditOutlined key="edit" />]}
          >
            <Meta
              avatar={
                <Avatar
                  src={
                    loader.data[0]?.image
                      ? `http://localhost:8000${loader.data[0]?.image}`
                      : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fimages%2Fdefault-avatar-profile-icon-vector-social-media-user-image%2F346839683&psig=AOvVaw3nhNZvbYMGeIJXcmpTQ4-W&ust=1726200308518000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDQibTDvIgDFQAAAAAdAAAAABAE"
                  }
                />
              }
              title={loader.data[0]?.name}
              description={loader.data[0]?.role_name}
            />
          </Card>
        </div>
        <div className="my-5 p-5 bg-slate-200 rounded">
          {description &&
            description.map((item) => (
              <div className="flex">
                <p className="min-w-40">{item.label}</p>
                <p>
                  {": "}
                  {item.children}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DetailPage;
