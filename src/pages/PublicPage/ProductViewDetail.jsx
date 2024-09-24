import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  ColorPicker,
  InputNumber,
  notification,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { BarChartOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import request from "../../utils/request";
import useAuth from "../../components/RoutePrivate/useAuth";
import Title from "antd/es/typography/Title";
import VNDCellRender from "../../utils/vnd";
import LayoutPage from "../../components/LayoutPage";

const DetailPage = () => {
  const loader = useLoaderData();
  const [description, setDescription] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [keyRender, setKeyRender] = useState(0);
  const [totalPrice, setTotalPrice] = useState(loader.data[0]?.price);
  const [cart, setCart] = useState([]);
  const [apiContext, contextHolder] = notification.useNotification();
  const params = useParams();
  const { user } = useAuth();
  console.log("user: ", user);
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
        children: renderBaoMat({ data: loader.data[0]?.bao_mat }),
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
      {
        key: "12",
        label: "Giá bán",
        children: VNDCellRender({ data: loader.data[0]?.price }),
      },
    ];
    setDescription(description);
  }, []);

  const pathHeader = useMemo(() => {
    const results = [
      {
        label: "Danh sách sản phẩm",
        key: "/danh-sach-san-pham",
        icon: <BarChartOutlined />,
      },
      {
        label: "Khuyến mại",
        key: "/khuyen-mai",
        icon: <BarChartOutlined />,
      },
      {
        label: "Đơn hàng",
        key: "/don-hang",
        icon: <BarChartOutlined />,
      },
    ];
    return results;
  }, []);

  const handleAddCart = () => {
    const addCart = async () => {
      setLoading(true);
      try {
        await request.post("cart", {
          product_id: params.id,
          so_luong: quantity,
          total_price: totalPrice,
        });
        apiContext.success({
          message: "Thành công",
          description: "Thêm sản phẩm vào giỏ hàng thành công",
        });
        setKeyRender(Math.random());
      } catch (error) {
        apiContext.error({
          message: "Thất bại",
          description: "Thêm sản phẩm vào giỏ hàng thất bại!",
        });
      } finally {
        setLoading(false);
      }
    };
    addCart();
  };

  useEffect(() => {
    const getCartByUser = async () => {
      if (user?.id) {
        const res = await request.post(`cart/${user.id}`);
        res.data && setCart(res.data);
      }
    };
    getCartByUser();
  }, [user, keyRender]);

  return (
    <>
      {contextHolder}
      <LayoutPage
        urlPathHeader={user?.role_name === "admin" ? undefined : pathHeader}
        countCart={cart.length}
      >
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
              // actions={[<EditOutlined key="edit" />]}
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
          {user?.role_name === "customer" && (
            <div className="my-3 flex justify-between">
              <Title level={3} className="">
                Thông tin sản phẩm
              </Title>
              <div className="flex items-center">
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={(value) => {
                    setQuantity(value);
                    setTotalPrice(value * loader.data[0]?.price);
                  }}
                />
                <p className="mx-5 min-w-20">
                  {VNDCellRender({ data: totalPrice })}
                </p>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleAddCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          )}
          <div className="my-5 p-5 bg-slate-200 rounded">
            {description &&
              description.map((item) => (
                <div className="flex items-center my-3 pb-2 border-b border-solid border-gray-400">
                  <p className="min-w-40">{item.label}</p>
                  <p className="flex items-center">
                    {": "}
                    {item.children}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </LayoutPage>
    </>
  );
};

const renderBaoMat = ({ data }) => {
  switch (data) {
    case "van_tay":
      return "Vân tay";
    case "khuon_mat":
      return "Khuôn mặt";
    default:
      return data;
  }
};
export default DetailPage;
