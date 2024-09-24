import { useMemo, useState } from "react";
import { Button, notification, Tooltip } from "antd";
import request from "../../utils/request";
import { Link, useLoaderData } from "react-router-dom";
import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import PageContainer from "../../components/PageContainer";
import VNDCellRender from "../../utils/vnd";

const Cart = () => {
  const [apiContext, contextHolder] = notification.useNotification();
  const [keyRender, setKeyRender] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false
  const [fileList, setFileList] = useState([]);
  const [selectItem, setSelectItem] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const loader = useLoaderData();
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
  });
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
    { headerName: "Tên sản phẩm", field: "product.name" },
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
      editable: true,
      api: "cart-row-field",
    },
    {
      headerName: "Số tiền phải trả",
      field: "total_price",
      cellRenderer: (data) => VNDCellRender({ data: data.data.total_price }),
    },
    {
      headerName: "Hành động",
      field: "action",
      cellRenderer: ActionCellRender,
      cellRendererParams: {
        onEditItem: (item) => {
          setIsModalOpen(true);
          item.avatar
            ? setFileList([
                {
                  uid: "-1", // Đảm bảo giá trị uid là duy nhất cho mỗi tệp
                  name: "example.jpg", // Tên tệp
                  status: "done", // Trạng thái tệp
                  url: `http://localhost:8000${item.avatar}`, // Đường dẫn công khai
                },
              ])
            : setFileList([]);
        },
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
        urlPathHeader={pathHeader}
        title="Quản lý giỏ hàng"
        column={column}
        defaultColDef={defaultColDef}
        api={() => request.post(`cart/${loader?.data?.id}`)}
        setIsModalOpen={setIsModalOpen}
        apicontext={apiContext}
        key={keyRender}
        setKeyRender={setKeyRender}
        errApi="Lấy thông tin người dùng thất bại"
        titleCreate="Thêm người dùng"
        noData="Không có người dùng nào"
      />
    </>
  );
};

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

export default Cart;
