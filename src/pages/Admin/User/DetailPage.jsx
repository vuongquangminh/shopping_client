import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Descriptions,
  notification,
} from "antd";
import HeaderPage from "../../../components/HeaderPage";
import { useEffect, useState } from "react";
import request from "../../../utils/request";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import CreateNEdit from "../../../components/Modal/CreateNEdit";

const DetailPage = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [description, setDescription] = useState([]);
  const [apicontext, contextHolder] = notification.useNotification();
  const [show, setShow] = useState(false);

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
  }, []);

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
        label: "Đại chỉ",
        children: <p>{data?.address}</p>,
      },
    ];

    setDescription(items);
  }, [data]);

  return (
    <>
      {contextHolder}
      <HeaderPage />

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
              <img alt="example" src={`http://localhost:8000${data?.avatar}`} />
            }
            actions={[<EditOutlined key="edit" />]}
          >
            <Meta
              avatar={<Avatar src={`http://localhost:8000${data?.avatar}`} />}
              title={data?.name}
              description={data?.role_name}
            />
          </Card>
        </div>
        <div className="my-5 p-5 bg-slate-200 rounded">
          <Descriptions title="Thông tin" items={description} />
        </div>

        <CreateNEdit show={show} setShow={setShow} />
        <div className="flex justify-end">
          <Button type="primary" onClick={() => setShow(true)}>
            Sửa
          </Button>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
