import { BarChartOutlined } from "@ant-design/icons";
import HeaderPage from "../../../components/HeaderPage";
import { CChart } from "@coreui/react-chartjs";
import { useEffect, useState } from "react";
import request from "../../../utils/request";

const DoanhThuPage = () => {
  const [listProduct, setListProduct] = useState([]);
  const [soLuong, setSoLuong] = useState([]);

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

  useEffect(() => {
    const getListProduct = async () => {
      const res = await request.post("list-product");
      console.log("res: ", res);
      const dataProduct = res?.data.map((item) => item.name);
      const dataSoLuong = res?.data.map((item) => item.so_luong);
      dataSoLuong && setSoLuong(dataSoLuong);
      dataProduct && setListProduct(dataProduct);
    };
    getListProduct();
  }, []);

  return (
    <>
      <HeaderPage urlPath={data} />
      <CChart
        className="m-5"
        type="bar"
        data={{
          labels: listProduct,
          datasets: [
            {
              label: "Doanh thu sản phẩm",
              backgroundColor: "#f87979",
              data: soLuong,
            },
          ],
        }}
        // labels="months"
        options={{
          plugins: {
            legend: {
              labels: {
                color: "",
              },
            },
          },
        }}
      />
    </>
  );
};

export default DoanhThuPage;
