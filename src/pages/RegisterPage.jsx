import React from "react";
import { Button, Form, Input, notification } from "antd";
import background from "../assets/image.png";
import { Link } from "react-router-dom";
import request from "../utils/request";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values) => {
    const register = async () => {
      try {
        await request.post("auth/register", values);
        api.success({
          message: "Thành công",
          description: "Đăng ký tài khoản thành công",
        });
      } catch (err) {
        api.error({
          message: "Thất bại",
          description: "Đăng ký tài khoản thất bại",
        });
      }
    };
    register();
  };
  return (
    <>
      {contextHolder}
      <div
        className="flex justify-center h-screen items-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover", // Đảm bảo hình ảnh phủ toàn bộ div
          backgroundPosition: "center", // Căn giữa hình ảnh
          backgroundRepeat: "no-repeat", // N
        }}
      >
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          // style={{
          //   maxWidth: 600,
          // }}
          layout="vertical"
          className=" w-1/2 border p-8 bg-slate-300 rounded-lg"
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Tên tài khoản"
            rules={[
              {
                required: true,
                message: "Làm ơn nhập tên tài khoản!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Email chưa đúng định dạng!",
              },
              {
                required: true,
                message: "Làm ơn nhập Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Làm ơn nhập mật khẩu!",
              },
            ]}
            hasFeedback
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
              {
                required: true,
                message: "Làm ơn nhập số điện thoại!",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="mr-5">
              Register
            </Button>
            Or <Link to="/">Đăng nhập!</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default RegisterPage;
