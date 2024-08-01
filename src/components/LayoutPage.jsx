import { Layout } from "antd";
import HeaderPage from "./HeaderPage";

const LayoutPage = ({ children }) => {
  return (
    <Layout className="bg-inherit">
      <HeaderPage />
      {children}
      {/* <Footer style={{ backgroundColor: "greenyellow" }}>Footer</Footer> */}
    </Layout>
  );
};

export default LayoutPage;
