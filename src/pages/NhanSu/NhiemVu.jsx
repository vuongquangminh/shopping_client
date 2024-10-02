import { Button, notification, Tag, Tooltip } from "antd";
import PageContainer from "../../components/PageContainer";
import {
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SafetyOutlined,
  SignatureOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import request from "../../utils/request";
import NhiemVuDialog from "./NhiemVuDialog";
import HoanThanhDialog from "./HoanThanhDialog";
import VNDCellRender from "../../utils/vnd";

const NhiemVu = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [modalNhanViec, setIsModalNhanViec] = useState(false); // Default to false
  const [keyRender, setKeyRender] = useState(1);
  const [item, setItem] = useState();
  const [modalHoanThanh, setModalHoanThanh] = useState(false);
  const column = [
    { headerName: "Tên người đặt hàng", field: "user.name", minWidth: 150 },
    { headerName: "Địa chỉ giao hàng", field: "user.address", flex: 150 },
    {
      headerName: "Giá trị đơn hàng",
      field: "total_price",
      flex: 150,
      cellRenderer: (data) => {
        return VNDCellRender({ data: data?.data?.total_price });
      },
    },
    {
      headerName: "Trạng thái đơn hàng",
      field: "status",
      flex: 150,
      cellRenderer: (data) => TrangThaiCellRender({ data: data?.data }),
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
        onHoanThanh: (item) => {
          setItem(item);
          setModalHoanThanh(true);
        },
      },
      filter: false,
    },
  ];

  const pathHeader = useMemo(() => {
    const results = [
      {
        label: "Nhiệm vụ của tôi",
        key: "/nhiem-vu",
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

  return (
    <>
      {contextHolder}
      <PageContainer
        title="Nhiệm vụ của tôi"
        urlPathHeader={pathHeader}
        column={column}
        api={() => request.get("nhiem-vu")}
        apicontext={apicontext}
        key={keyRender}
        errApi="Lấy thông tin nhiệm vụ thất bại"
        noData="Không có nhiệm vụ nào"
      />
      <HoanThanhDialog
        open={modalHoanThanh}
        setOpen={setModalHoanThanh}
        item={item}
        setKeyRender={setKeyRender}
        apicontext={apicontext}
      />

      <NhiemVuDialog
        open={modalNhanViec}
        setOpen={setIsModalNhanViec}
        item={item}
        apicontext={apicontext}
        setKeyRender={setKeyRender}
      />
    </>
  );
};

export default NhiemVu;

const ActionCellRender = ({ onNhanViec, onHoanThanh, data }) => {
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
      {data.status === "dang_giao_hang" && (
        <Tooltip title={"Hoàn thành"}>
          <Button
            shape="circle"
            icon={<SafetyOutlined />}
            type="text"
            onClick={() => onHoanThanh(data)}
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
  switch (data?.status) {
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
        <>
          <Tag icon={<SyncOutlined spin />} color="#108ee9">
            {`Đang giao hàng ${data.percent}% `}
          </Tag>
        </>
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
