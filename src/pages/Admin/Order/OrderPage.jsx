import { Button, notification, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import PageContainer from "../../../components/PageContainer";
import request from "../../../utils/request";
import CreateNEdit from "../../../components/Modal/CreateNEdit";
import ModalDelete from "../../../components/Modal/delete";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
  RightOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false
  const [keyRender, setKeyRender] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [nhanSu, setNhanSu] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const column = [
    { headerName: "Tên người dùng", field: "user.name", minWidth: 150 },
    { headerName: "Giá trị đơn hàng", field: "total_price", flex: 150 },
    { headerName: "Địa chỉ giao hàng", field: "user.address", flex: 150 },
    {
      headerName: "Người giao hàng",
      field: "nhan_su.name",
      flex: 150,
    },
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
        onEditItem: (item) => {
          setIsEdit(true);
          setItem({
            ...item,
            ngay_han: item.ngay_han && dayjs(item.ngay_han, "YYYY-MM-DD"),
            user_name: item?.user?.name,
            nhan_su_id: item?.nhan_su?.name,
          });
          setIsModalOpen(true);
        },
        onDeleteItem: (item) => {
          setItem(item);
          setModalDelete(true);
        },
      },
      filter: false,
    },
  ];

  useEffect(() => {
    const dataForm = [
      {
        type: "input",
        field: "user_name",
        label: "Tên người",
        readOnly: isEdit,
      },
      {
        type: "inputNumber",
        field: "total_price",
        label: "Giá trị đơn hàng",
        readOnly: isEdit,
      },
      {
        type: "select",
        field: "nhan_su_id",
        label: "Người giao hàng",
        options: nhanSu?.map((item) => {
          return {
            value: item.value,
            label: item.label,
          };
        }),
      },
      {
        type: "date",
        field: "ngay_han",
        label: "Ngày hạn",
        defaultValue: "2020-01-01",
        dateFormat: "DD/MM/YYYY",
      },
    ];
    setDataForm(dataForm);
  }, [nhanSu, isEdit]);

  useEffect(() => {
    const getNhanSu = async () => {
      const res = await request.get("user/nhan-su/all");
      const nhanSu = res.data?.map((item) => {
        return {
          value: item.id,
          label: `${item.name} - ${item.email}`,
        };
      });
      setNhanSu(nhanSu);
    };
    getNhanSu();
  }, []);

  return (
    <>
      {contextHolder}
      <PageContainer
        title="Quản lý đơn hàng"
        column={column}
        api={() => request.get("order")}
        setIsModalOpen={setIsModalOpen}
        apicontext={apicontext}
        key={keyRender}
        errApi="Lấy thông tin đơn hàng thất bại"
        // titleCreate="Thêm đơn hàng"
        noData="Không có đơn hàng nào"
      />
      <CreateNEdit
        show={isModalOpen}
        setShow={setIsModalOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        item={item}
        setItem={setItem}
        apicontext={apicontext}
        dataForm={dataForm}
        setKeyRender={setKeyRender}
        apiCreate={`order`}
        apiEdit={item && `order/${item?.id}`}
        titleCreate={"Thêm đơn hàng mới"}
        titleEdit={"Chỉnh sửa đơn hàng"}
        dateField={"ngay_han"}
      />

      <ModalDelete
        open={modalDelete}
        setOpen={setModalDelete}
        name={`hủy đơn hàng của ${item?.user.name}`}
        api={`order/${item?.id}`}
        apicontext={apicontext}
        setKeyRender={setKeyRender}
      />
    </>
  );
};

export default OrderPage;

const ActionCellRender = ({ onEditItem, onDeleteItem, data }) => {
  return (
    <>
      <Tooltip title={"Giao việc"}>
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
          icon={<InfoCircleOutlined />}
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
