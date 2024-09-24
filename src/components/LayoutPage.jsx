import { Layout } from "antd";
import HeaderPage from "./HeaderPage";
import { Footer } from "antd/es/layout/layout";

const LayoutPage = ({ children, urlPathHeader, noUser, countCart }) => {
  return (
    <Layout className="bg-inherit mx-5">
      <HeaderPage
        urlPath={urlPathHeader}
        noUser={noUser}
        countCart={countCart}
      />
      {children}
      <Footer style={{ backgroundColor: "greenyellow" }}>Footer</Footer>
    </Layout>
  );
};

export default LayoutPage;
