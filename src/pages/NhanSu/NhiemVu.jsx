import { Button, notification, Tag, Tooltip } from "antd";
import PageContainer from "../../components/PageContainer";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SignatureOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ModalDelete from "../../components/Modal/delete";
import { useState } from "react";
import dayjs from "dayjs";
import request from "../../utils/request";
import NhiemVuDialog from "./NhiemVuDialog";

const NhiemVu = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [modalNhanViec, setIsModalNhanViec] = useState(false); // Default to false
  const [keyRender, setKeyRender] = useState(1);
  const [item, setItem] = useState();
  const [modalTuChoi, setModalTuChoi] = useState(false);
  const column = [
    { headerName: "Tên người đặt hàng", field: "user.name", minWidth: 150 },
    { headerName: "Giá trị đơn hàng", field: "total_price", flex: 150 },
    { headerName: "Địa chỉ giao hàng", field: "user.address", flex: 150 },
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

    {
      headerName: "Hành động",
      field: "action",
      minWidth: 100,
      cellRenderer: ActionCellRender,
      cellRendererParams: {
        onNhanViec: (item) => {
          setIsModalNhanViec(true);
          setItem(item);
        },
        onTuChoi: (item) => {
          setItem(item);
          setModalTuChoi(true);
        },
      },
      filter: false,
    },
  ];

  return (
    <>
      {contextHolder}
      <PageContainer
        title="Nhiệm vụ của tôi"
        column={column}
        api={() => request.get("nhiem-vu")}
        apicontext={apicontext}
        key={keyRender}
        errApi="Lấy thông tin nhiệm vụ thất bại"
        noData="Không có nhiệm vụ nào"
      />

      <ModalDelete
        open={modalTuChoi}
        setOpen={setModalTuChoi}
        name={`bỏ đơn hàng của ${item?.user.name}`}
        api={`order/${item?.id}`}
        apicontext={apicontext}
        setKeyRender={setKeyRender}
      />
      <NhiemVuDialog
        open={modalNhanViec}
        setOpen={setIsModalNhanViec}
        item={item}
      />
    </>
  );
};

export default NhiemVu;

const ActionCellRender = ({ onNhanViec, onTuChoi, data }) => {
  return (
    <>
      {data.status === "cho_nhan_viec" && (
        <Tooltip title={"Nhận việc"}>
          <Button
            shape="circle"
            icon={<SignatureOutlined />}
            type="text"
            onClick={() => onNhanViec(data)}
          />
        </Tooltip>
      )}
    </>
  );
};
const TrangThaiCellRender = ({ data }) => {
  if (!data) {
    return <></>;
  }
  switch (data) {
    case "cho_xac_nhan":
      return (
        <Tag icon={<ClockCircleOutlined />} color="#43b10c">
          Chờ xác nhận
        </Tag>
      );
    case "cho_nhan_viec":
      return (
        <Tag color="#f9d92e" style={{ color: "#9b0f0f" }}>
          Chờ nhận việc
        </Tag>
      );
    case "dang_giao_hang":
      return (
        <Tag icon={<SyncOutlined spin />} color="#108ee9">
          Đang giao hàng"
        </Tag>
      );
    case "hoan_thanh":
      return (
        <Tag icon={<CheckCircleOutlined />} color="#87d068">
          Đã giao hàng
        </Tag>
      );
    case "huy":
      return (
        <Tag icon={<CloseCircleOutlined />} color="#f50">
          Đơn hàng bị hủy
        </Tag>
      );
    default:
      return <>{data}</>;
  }
};
