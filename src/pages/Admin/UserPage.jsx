import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import request from "../../utils/request";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UserPage = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [rowData, setRowData] = useState();
  const [apicontext, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState();
  const [form] = Form.useForm();
  const [api, setApi] = useState("user");
  const [fileList, setFileList] = useState([]);
  const column = [
    { field: "name" },
    { field: "email" },
    { field: "role_name" },
    { field: "avatar" },
    { field: "phone" },
    { field: "address" },
  ];

  const handleOk = () => {
    form.resetFields();

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    setApi(`user?page=${pagination.page}`);
  }, [pagination.page]);

  const onFinish = (values) => {
    console.log("values: ", values);
    // const createUser = async () => {
    //   try {
    //     await request.post("user", values);
    //     apicontext.success({
    //       message: "Thành công",
    //       description: "Thêm người dùng mới thành công",
    //     });
    //   } catch {
    //     apicontext.error({
    //       message: "Thất bại",
    //       description: "Thêm người dùng mới thất bại!",
    //     });
    //   }
    // };
    // createUser();
  };

  const handleChange = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      if (file.status === "done") {
        return file;
      }
      return {
        ...file,
        status: "done",
      };
    });
    setFileList(updatedFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <>
      {contextHolder}
      <PageContainer
        title="Quản lý người dùng"
        column={column}
        api={() => request.get(api)}
        setPagination={setPagination}
        key={pagination.page}
        rowData={rowData}
        setRowData={setRowData}
        setIsModalOpen={setIsModalOpen}
        apicontext={apicontext}
        errApi="Lấy thông tin người dùng thất bại"
        titleCreate=" Thêm người dùng"
        noData="Không có người dùng nào"
      />
      <Modal
        title="Thêm mới người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form
          form={form}
          onFinish={onFinish}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            email: "minh@gmail.com",
            password: "12345678",
            confirm: "12345678",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Trường name là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Trường email là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Trường password là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Nhập lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Trường phone là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Trường address là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role_name"
            label="Role Name"
            rules={[
              { required: true, message: "Trường role name là bắt buộc" },
            ]}
          >
            <Select
              showSearch
              className="w-full"
              placeholder="Role Name"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "customer",
                  label: "Customer",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar"
            rules={[{ required: true, message: "Trường avatar là bắt buộc" }]}
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item className="text-end">
            <Space>
              <Button onClick={handleOk}>Hủy</Button>
              <Button htmlType="submit" type="primary">
                Đồng ý
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserPage;
