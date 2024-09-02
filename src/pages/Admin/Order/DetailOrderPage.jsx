import { DeleteOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import { Button, notification, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../../components/PageContainer";
import request from "../../../utils/request";

const DetailOrderPage = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false

  const [keyRender, setKeyRender] = useState(1);

  const params = useParams();
  console.log("params: ", params);
  const column = [
    { headerName: "Tên người dùng", field: "user.name", minWidth: 250 },
    { headerName: "Giá trị đơn hàng", field: "total_price", flex: 150 },
    { headerName: "Người giao hàng", field: "nhan_su.name", flex: 150 },
    {
      headerName: "Trạng thái đơn hàng",
      field: "status",
      flex: 150,
      cellRenderer: (data) => TrangThaiCellRender({ data: data?.data?.status }),
    },
    {
      headerName: "Ngày hạn",
      field: "ngay_han",
      flex: 150,
      cellRenderer: (data) => dayjs(data?.data?.ngay_han).format("DD/MM/YYYY"),
    },

    // {
    //   headerName: "Hành động",
    //   field: "action",
    //   minWidth: 100,
    //   cellRenderer: ActionCellRender,
    //   cellRendererParams: {
    //     onEditItem: (item) => {
    //       setIsEdit(true);
    //       setItem({
    //         ...item,
    //         ngay_han: item.ngay_han && dayjs(item.ngay_han, "YYYY-MM-DD"),
    //         user_name: item?.user?.name,
    //         nhan_su_id: item?.nhan_su?.name,
    //       });
    //       setIsModalOpen(true);
    //     },
    //     onDeleteItem: (item) => {
    //       setItem(item);
    //       setModalDelete(true);
    //     },
    //   },
    //   filter: false,
    // },
  ];
  return (
    <>
      <PageContainer
        title="Chi tiết đơn hàng"
        column={column}
        api={() => request.get(`order/${params.id}`)}
        setIsModalOpen={setIsModalOpen}
        apicontext={apicontext}
        key={keyRender}
        errApi="Lấy thông tin đơn hàng thất bại"
        noData="Không có đơn hàng nào"
      />
    </>
  );
};

export default DetailOrderPage;

const ActionCellRender = ({ onEditItem, onDeleteItem, data }) => {
  return (
    <>
      <Tooltip title={"Chỉnh sửa"}>
        <Button
          shape="circle"
          icon={<EditOutlined />}
          type="text"
          onClick={() => onEditItem(data)}
        />
      </Tooltip>
      <Tooltip title={"Xóa"}>
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          type="text"
          onClick={() => onDeleteItem(data)}
        />
      </Tooltip>
      <Tooltip title={"Chi tiết"}>
        <Link to={"" + data.id}>
          <Button shape="circle" icon={<RightOutlined />} type="text" />
        </Link>
      </Tooltip>
    </>
  );
};

const TrangThaiCellRender = ({ data }) => {
  if (!data) {
    return <></>;
  }
  switch (data) {
    case "cho_nhan_viec":
      return <Tag>Chờ nhận việc</Tag>;
    case "dang_giao":
      return <Tag color="#108ee9">Đang giao hàng</Tag>;
    case "hoan_thanh":
      return <Tag color="#87d068">Hoàn thành</Tag>;
    case "tu_choi":
      return <Tag color="gold">Từ chối</Tag>;
    case "huy_don":
      return <Tag color="#f50">Hủy đơn</Tag>;
    default:
      return <Tag color="#f50">{data}</Tag>;
  }
};
