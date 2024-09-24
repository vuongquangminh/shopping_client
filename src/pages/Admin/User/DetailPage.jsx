import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Descriptions,
  notification,
} from "antd";
import HeaderPage from "../../../components/HeaderPage";
import { useEffect, useMemo, useState } from "react";
import request from "../../../utils/request";
import { useParams } from "react-router-dom";
import { BarChartOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import CreateNEditHasFile from "../../../components/Modal/CreateNEditHasFile";
import useAuth from "../../../components/RoutePrivate/useAuth";
import LayoutPage from "../../../components/LayoutPage";

const DetailPage = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [description, setDescription] = useState([]);
  const [apicontext, contextHolder] = notification.useNotification();
  const [show, setShow] = useState(false);
  const [dataForm, setDataForm] = useState([]);
  const [keyRender, setKeyRender] = useState(0);
  const { user } = useAuth();

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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get(`user/${params.id}`);
        res.data && setData(res.data);
      } catch (error) {
        apicontext.error({
          message: "Thành bại",
          description: "Lấy dữ liệu thất bại!",
        });
      }
    };
    getData();
  }, [keyRender, show]);

  const vaiTro = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "nhan_su",
      label: "Nhân sự",
    },
    {
      value: "customer",
      label: "Khách hàng",
    },
  ];

  useEffect(() => {
    const items = [
      {
        key: "1",
        label: "Tên người dùng",
        children: <p>{data?.name}</p>,
      },
      {
        key: "2",
        label: "Tên đang nhập (Email)",
        children: <p>{data?.email}</p>,
      },
      {
        key: "3",
        label: "Vai trò",
        children: <p>{data?.role_name}</p>,
      },
      {
        key: "4",
        label: "Số điện thoại",
        children: <p>{data?.phone}</p>,
      },
      {
        key: "5",
        label: "Địa chỉ",
        children: <p>{data?.address}</p>,
      },
    ];
    const dataForm = [
      {
        type: "upload",
        field: "avatar",
        label: "Ảnh đại diện",
        fileList: [],
      },
      {
        type: "input",
        field: "name",
        label: "Tên người dùng",
        rule: [
          {
            required: true,
            message: "Trường tên sản phẩm không được bỏ trống!",
          },
        ],
      },
      {
        type: "input",
        field: "email",
        label: "Tên đang nhập (Email)",
        rule: [
          {
            required: true,
            message: "Trường loại sản phẩm không được bỏ trống!",
          },
        ],
      },
      {
        type: "select",
        field: "role_name",
        label: "Vai trò",
        options: vaiTro.map((item) => {
          return {
            value: item.value,
            label: item.label,
          };
        }),
      },
      {
        type: "input",
        field: "phone",
        label: "Số điện thoại",
        fileList: [],
      },
      {
        type: "input",
        field: "address",
        label: "Địa chỉ",
      },
    ];
    setDataForm(dataForm);
    setDescription(items);
  }, [data, show]);

  const handleEdit = () => {
    setShow(true);
  };

  console.log("pathHeader: ", pathHeader);
  return (
    <>
      {contextHolder}
      <LayoutPage
        urlPathHeader={user?.role_name === "admin" ? undefined : pathHeader}
      >
        <div className="m-5">
          <Breadcrumb
            items={[
              {
                title: "Quản lý người dùng",
                href: "/admin/user",
              },
              {
                title: "Thông tin người dùng",
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
            <Descriptions title="Thông tin" items={description} />
          </div>

          <CreateNEditHasFile
            show={show}
            setShow={setShow}
            isEdit={true}
            dataForm={dataForm}
            item={{ ...data, img: data?.avatar }}
            apicontext={apicontext}
            titleEdit={"Chỉnh sửa thông tin cá nhân"}
            setKeyRender={setKeyRender}
            apiEdit={`user/${data?.id}`}
            fileName="avatars"
          />
          <div className="flex justify-end">
            <Button type="primary" onClick={handleEdit}>
              Sửa
            </Button>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};

export default DetailPage;
