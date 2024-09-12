import { Layout } from "antd";
import HeaderPage from "./HeaderPage";
import { Footer } from "antd/es/layout/layout";

const LayoutPage = ({ children, urlPathHeader, noUser }) => {
  return (
    <Layout className="bg-inherit mx-5">
      <HeaderPage urlPath={urlPathHeader} noUser={noUser} />
      {children}
      <Footer style={{ backgroundColor: "greenyellow" }}>Footer</Footer>
    </Layout>
  );
};

export default LayoutPage;
