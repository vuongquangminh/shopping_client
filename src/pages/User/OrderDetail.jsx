import { useMemo, useState } from "react";
import { Breadcrumb, notification } from "antd";
import { useLoaderData, useParams } from "react-router-dom";
import { BarChartOutlined } from "@ant-design/icons";
import PageContainer from "../../components/PageContainer";
import VNDCellRender from "../../utils/vnd";
import request from "../../utils/request";

const OrderDetail = () => {
  const [apiContext, contextHolder] = notification.useNotification();
  const [keyRender, setKeyRender] = useState(1);
  const loader = useLoaderData();
  const params = useParams();
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);
  const column = [
    {
      headerName: "Tên sản phẩm",
      field: "product.name",
    },
    {
      headerName: "Ảnh sản phẩm",
      field: "avatar",
      cellRenderer: (data) => (
        <div className="h-full">
          <img
            className="h-full"
            src={`http://localhost:8000${data.data.product.image}`}
            alt=""
          />
        </div>
      ),
    },
    {
      headerName: "Số lượng",
      field: "so_luong",
    },
    {
      headerName: "Số tiền phải trả",
      field: "total_price",
      cellRenderer: (data) => VNDCellRender({ data: data.data.product.price }),
    },
  ];
  const pathHeader = useMemo(() => {
    const results = [
      {
        label: "Danh sách sản phẩm",
        key: "/danh-sach-san-pham",
        icon: <BarChartOutlined />,
      },
      {
        label: "Khuyến mại",
        key: "/khuyen-mai",
        icon: <BarChartOutlined />,
      },
      {
        label: "Đơn hàng",
        key: "/don-hang",
        icon: <BarChartOutlined />,
      },
    ];
    return results;
  }, []);

  const breadcrumb = () => {
    return (
      <Breadcrumb
        items={[
          {
            title: "Quản lý đơn đặt hàng",
            href: "/don-hang",
          },
          {
            title: "Chi tiết",
          },
          {
            title: loader.data[0]?.id,
          },
        ]}
      />
    );
  };
  console.log("params: ", params);
  return (
    <>
      {contextHolder}

      <PageContainer
        urlPathHeader={pathHeader}
        title="Chi tiết đơn hàng "
        column={column}
        defaultColDef={defaultColDef}
        api={() => request.get(`order/${params?.id}`)}
        apicontext={apiContext}
        key={keyRender}
        setKeyRender={setKeyRender}
        breadcrumb={breadcrumb()}
        errApi="Lấy thông tin sản phẩm thất bại"
        noData="Không có sản phẩm nào"
      />
    </>
  );
};

export default OrderDetail;
