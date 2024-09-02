import { BarChartOutlined } from "@ant-design/icons";
import HeaderPage from "../../../components/HeaderPage";

const DoanhThuPage = () => {
  const data = [
    {
      label: "Doanh thu sản phẩm",
      key: "/admin/doanh-thu/product",
      icon: <BarChartOutlined />,
    },
    {
      label: "Doanh thu sản phẩm theo tháng",
      key: "/admin/doanh-thu/product/month",
      icon: <BarChartOutlined />,
    },
    {
      label: "Doanh thu sản phẩm theo năm",
      key: "/admin/doanh-thu/product/year",
      icon: <BarChartOutlined />,
    },
  ];
  return (
    <>
      <HeaderPage urlPath={data} />
    </>
  );
};

export default DoanhThuPage;
