import { Avatar, Breadcrumb, Card, notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChartOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import HeaderPage from "../../components/HeaderPage";
import request from "../../utils/request";

const DetailPage = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [description, setDescription] = useState([]);
  const [apicontext, contextHolder] = notification.useNotification();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get(`product/${params.id}`);
        res.data && setData(res.data);
      } catch (error) {
        apicontext.error({
          message: "Thành bại",
          description: "Lấy dữ liệu thất bại!",
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const items = [
      {
        key: "1",
        label: "Tên sản phẩm",
        children: data?.name,
      },
      {
        key: "2",
        label: "Loại thương hiệu",
        children: data?.type_product_id,
      },
      {
        key: "3",
        label: "Chip",
        children: data?.chip_id,
      },
      {
        key: "4",
        label: "Chống nước",
        children: data?.chong_nuoc,
      },
      {
        key: "5",
        label: "Màn hình",
        children: data?.man_hinh,
      },
      {
        key: "6",
        label: "Camera",
        children: data?.camera,
      },

      {
        key: "7",
        label: "Pin",
        children: data?.pin,
      },
      {
        key: "8",
        label: "Bảo mật",
        children: data?.bao_mat,
      },
      {
        key: "9",
        label: "Mô tả",
        children: data?.description,
      },
    ];
    setDescription(items);
  }, [data]);
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

  console.log("data: ", data);
  return (
    <>
      {contextHolder}
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
              title: data?.name,
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
                  data?.avatar
                    ? `http://localhost:8000${data?.avatar}`
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
                    data?.avatar
                      ? `http://localhost:8000${data?.avatar}`
                      : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fimages%2Fdefault-avatar-profile-icon-vector-social-media-user-image%2F346839683&psig=AOvVaw3nhNZvbYMGeIJXcmpTQ4-W&ust=1726200308518000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDQibTDvIgDFQAAAAAdAAAAABAE"
                  }
                />
              }
              title={data?.name}
              description={data?.role_name}
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
