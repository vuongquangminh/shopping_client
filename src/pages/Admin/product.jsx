import { Layout } from "antd";
import HeaderPage from "../../components/HeaderPage";
import { Footer } from "antd/es/layout/layout";
import GridExample from "./content";

const AdminProduct = () => {
  return (
    <Layout className="bg-inherit">
      <HeaderPage />
      <GridExample />
      <Footer style={{ backgroundColor: "greenyellow" }}>Footer</Footer>
    </Layout>
  );
};

export default AdminProduct;
