import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import background from "../assets/image.png";
import { Link } from "react-router-dom";
import request from "../utils/request";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const login = async () => {
      try {
        const res = await request.post("auth/login", values);
        const token = res.data.access_token;
        localStorage.setItem("authToken", token);
        const fetchUser = async () => {
          const response = await request.get("auth/user");
          switch (response?.data?.role_name) {
            case "admin":
              return navigate("/admin/user");
            case "customer":
              return navigate("/danh-sach-san-pham");
            case "nhan_su":
              return navigate("/nhiem-vu");
            default:
              return navigate("/");
          }
        };
        fetchUser();
      } catch (err) {
        api.error({
          message: "Đăng nhập thất bại",
          description: "Tên đăng nhập hoặc mật khẩu không chính xác",
        });
      }
    };
    login();
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
          name="normal_login"
          className="login-form max-w-96 w-1/2 border p-8 bg-slate-300 rounded-lg"
          initialValues={{
            remember: true,
            password: "12345678",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Email chưa đúng định dạng!",
              },
              {
                required: true,
                message: "Làm ơn nhập tên đăng nhập!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Làm ơn nhập mật khẩu!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
              hasFeedback
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ tài khoản</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Quên mật khẩu
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button mr-5"
            >
              Đăng nhập
            </Button>
            Or <Link to="/dang-ky">Đăng ký!</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default LoginPage;
