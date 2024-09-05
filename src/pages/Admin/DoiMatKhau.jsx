import { Button, Form, Input, notification, Spin } from "antd";
import HeaderPage from "../../components/HeaderPage";
import request from "../../utils/request";
import { useState } from "react";

const DoiMatKhau = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values) => {
    const change = async () => {
      setLoading(true);
      try {
        await request.post("doi-mat-khau", values);
        api.success({
          message: "Thành công",
          description: "Đổi mật khẩu thành công!",
        });
      } catch (error) {
        api.error({
          message: "Thất bại",
          description: error?.response?.data?.message,
        });
      } finally {
        setLoading(false);
      }
    };
    change();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {" "}
      {contextHolder}
      <HeaderPage />
      <div
        className=" flex justify-center items-center"
        style={{ height: "500px" }}
      >
        {loading ? (
          <Spin />
        ) : (
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu cũ!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu mới!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              label="Nhập lại mật khẩu mới"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu mới!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu mới không trùng khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  );
};

export default DoiMatKhau;
