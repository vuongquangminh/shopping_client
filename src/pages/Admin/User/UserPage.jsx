import { useEffect, useMemo, useState } from "react";
import PageContainer from "../../../components/PageContainer";
import request from "../../../utils/request";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Tooltip,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ModalDelete from "../../../components/Modal/delete";
import { Link } from "react-router-dom";

const UserPage = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectItem, setSelectItem] = useState();
  const [keyRender, setKeyRender] = useState(1);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const column = [
    { headerName: "Tên người dùng", field: "name" },
    { headerName: "Tên đăng nhập (Email)", field: "email" },
    { headerName: "Vai trò", field: "role_name" },
    {
      headerName: "Ảnh đại diện",
      field: "avatar",
      cellRenderer: (data) => (
        <div className="h-full">
          <img
            className="h-full"
            src={`http://localhost:8000${data.data.avatar}`}
            alt=""
          />
        </div>
      ),
    },
    { headerName: "Số điện thoại", field: "phone" },
    { headerName: "Địa chỉ", field: "address" },
    {
      headerName: "Hành động",
      field: "action",
      cellRenderer: ActionCellRender,
      cellRendererParams: {
        onEditItem: (item) => {
          setIsEdit(true);
          setSelectItem(item);
          setIsModalOpen(true);
          item.avatar
            ? setFileList([
                {
                  uid: "-1", // Đảm bảo giá trị uid là duy nhất cho mỗi tệp
                  name: "example.jpg", // Tên tệp
                  status: "done", // Trạng thái tệp
                  url: `http://localhost:8000${item.avatar}`, // Đường dẫn công khai
                },
              ])
            : setFileList([]);
        },
        onDeleteItem: (item) => {
          setSelectItem(item);
          setModalDelete(true);
        },
      },
      filter: false,
    },
  ];

  useEffect(() => {
    if (isEdit && selectItem) {
      form.setFieldsValue({ ...selectItem });
    }
  }, [form, isEdit, selectItem]);

  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
    setKeyRender(Math.random());
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const onFinish = async (values) => {
    // console.log({ "select: ": selectItem, "value: ": values });
    const formData = new FormData();
    const idItem = selectItem?.id;
    // Append form fields
    Object.keys(values).forEach((key) => {
      if (key !== "avatar") {
        // Don't append avatar as it's handled separately
        formData.append(key, values[key]);
      }
    });

    // Append files
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("avatar", file.originFileObj);
      }
    });

    try {
      isEdit
        ? await request.post(`user/${idItem}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await request.post("user", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      apicontext.success({
        message: "Thành công",
        description: "Thêm người dùng mới thành công",
      });
      handleOk(); // Close modal on success
    } catch (error) {
      apicontext.error({
        message: "Thất bại",
        description: "Thêm người dùng mới thất bại!",
      });
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
        defaultColDef={defaultColDef}
        api={() => request.get("user")}
        setIsModalOpen={setIsModalOpen}
        apicontext={apicontext}
        key={keyRender}
        errApi="Lấy thông tin người dùng thất bại"
        titleCreate="Thêm người dùng"
        noData="Không có người dùng nào"
      />

      <Modal
        title="Thêm mới người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Using null instead of an empty array
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
            label="Tên người dùng"
            rules={[
              { required: true, message: "Trường tên người dùng là bắt buộc" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Tên đăng nhập (Email)"
            rules={[{ required: true, message: "Trường email là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Trường mật khẩu là bắt buộc" }]}
          >
            <Input.Password />
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
            label="Số điện thoại"
            rules={[
              { required: true, message: "Trường số điện thoại là bắt buộc" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Trường địa chỉ là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role_name"
            label="Vai trò"
            rules={[{ required: true, message: "Trường vai trò là bắt buộc" }]}
          >
            <Select
              showSearch
              className="w-full"
              placeholder="Vai trò"
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
                  value: "nhan_su",
                  label: "Nhân sự",
                },
                {
                  value: "customer",
                  label: "Khách hàng",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="avatar" label="Ảnh đại diện">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              customRequest={({ file, onSuccess }) => {
                setFileList([file]); // Update fileList with the new file
                onSuccess(file);
              }}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item className="text-end">
            <Space>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button htmlType="submit" type="primary">
                Đồng ý
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <ModalDelete
        open={modalDelete}
        setOpen={setModalDelete}
        name={selectItem?.name}
        api={() => request.delete(`user/${selectItem.id}`)}
        apicontext={apicontext}
        setKeyRender={setKeyRender}
      />
    </>
  );
};

const ActionCellRender = ({ onEditItem, onDeleteItem, data }) => {
  return (
    <>
      <Tooltip title={"Chỉnh sửa"}>
        <Button
          shape="circle"
          icon={<EditOutlined />}
          type="text"
          onClick={() => onEditItem(data)}
        />
      </Tooltip>
      <Tooltip title={"Xóa"}>
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          type="text"
          onClick={() => onDeleteItem(data)}
        />
      </Tooltip>

      <Tooltip title={"Chi tiết"}>
        <Link to={"" + data.id}>
          <Button shape="circle" icon={<RightOutlined />} type="text" />
        </Link>
      </Tooltip>
    </>
  );
};

export default UserPage;
