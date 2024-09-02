import { notification } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../../components/PageContainer";
import request from "../../../utils/request";

const DetailOrderPage = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const params = useParams();

  const column = [
    {
      headerName: "Đơn hàng của người dùng",
      field: "order.user.name",
      minWidth: 250,
    },
    { headerName: "Sản phẩm", field: "product.name", flex: 150 },
    {
      headerName: "Hình ảnh",
      field: "image",
      flex: 150,
      cellRenderer: (data) => {
        return (
          <div className="h-full">
            <img
              className="h-full"
              src={`http://localhost:8000${data.data.product.image}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      headerName: "Số lượng",
      field: "so_luong",
      flex: 150,
    },
  ];
  return (
    <>
      {contextHolder}
      <PageContainer
        title="Chi tiết đơn hàng"
        column={column}
        api={() => request.get(`order/${params.id}`)}
        apicontext={apicontext}
        errApi="Lấy thông tin đơn hàng thất bại"
        noData="Không có đơn hàng nào"
      />
    </>
  );
};

export default DetailOrderPage;
