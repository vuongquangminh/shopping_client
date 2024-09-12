import { Layout } from "antd";
import HeaderPage from "./HeaderPage";
import { Footer } from "antd/es/layout/layout";

const LayoutPage = ({ children }) => {
  return (
    <Layout className="bg-inherit mx-5">
      <HeaderPage />
      {children}
      <Footer style={{ backgroundColor: "greenyellow" }}>Footer</Footer>
    </Layout>
  );
};

export default LayoutPage;
