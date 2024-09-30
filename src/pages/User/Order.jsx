import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Drawer,
  Image,
  InputNumber,
  List,
  notification,
  Tag,
  Tooltip,
} from "antd";
import { Link, useLoaderData } from "react-router-dom";
import {
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  RightOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import PageContainer from "../../components/PageContainer";
import VNDCellRender from "../../utils/vnd";
import request from "../../utils/request";
import ModalDelete from "../../components/Modal/delete";
import useAuth from "../../components/RoutePrivate/useAuth";

const Order = () => {
  const [apiContext, contextHolder] = notification.useNotification();
  const [keyRender, setKeyRender] = useState(1);
  const [selectItem, setSelectItem] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);
  useEffect(() => {
    const getCartByUser = async () => {
      if (user?.id) {
        const res = await request.post(`cart/${user.id}`);
        res.data && setCart(res.data);
      }
    };
    getCartByUser();
  }, [user]);
  const column = [
    {
      headerName: "Sản phẩm",
      field: "product.name",
      cellRenderer: SanPhamCellRender,
    },
    {
      headerName: "Số tiền phải trả",
      field: "total_price",
      cellRenderer: (data) => VNDCellRender({ data: data.data.total_price }),
    },
    {
      headerName: "Trạng thái",
      field: "status",
      cellRenderer: (data) => {
        switch (data.data.status) {
          case "cho_xac_nhan":
            return (
              <Tag icon={<ClockCircleOutlined />} color="#43b10c">
                Chờ xác nhận
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
                Hủy
              </Tag>
            );
          default:
            return <>{data.data.status}</>;
        }
      },
    },
    {
      headerName: "Hành động",
      field: "action",
      cellRenderer: ActionCellRender,
      cellRendererParams: {
        onDeleteItem: (item) => {
          setSelectItem(item);
          setModalDelete(true);
        },
      },
      filter: false,
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

  return (
    <>
      {contextHolder}
      <PageContainer
        countCart={cart.length}
        urlPathHeader={pathHeader}
        title="Đơn đặt hàng"
        column={column}
        defaultColDef={defaultColDef}
        api={() => request.post("list-order")}
        apicontext={apiContext}
        key={keyRender}
        setKeyRender={setKeyRender}
        errApi="Lấy thông tin người dùng thất bại"
        noData="Không có người dùng nào"
      />

      <ModalDelete
        open={modalDelete}
        setOpen={setModalDelete}
        name={"đơn đặt hàng"}
        api={`cus-order/${selectItem?.id}`}
        apicontext={apiContext}
        setKeyRender={setKeyRender}
      />
    </>
  );
};

const ActionCellRender = ({ onDeleteItem, data }) => {
  return (
    <>
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

const SanPhamCellRender = ({ data }) => {
  if (!data) {
    <></>;
  }
  const order_products = data.order_product;
  const san_pham =
    order_products.length > 0
      ? order_products.map((item, index) => {
          if (
            order_products.length == 1 ||
            order_products.length == index + 1
          ) {
            return item.product.name;
          } else {
            return `${item.product?.name}, `;
          }
        })
      : "Không có đơn hàng nào";
  return <>{san_pham.join("")}</>;
};
export default Order;
