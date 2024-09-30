import { useMemo, useState } from "react";
import {
  Button,
  Drawer,
  Image,
  InputNumber,
  List,
  notification,
  Tooltip,
} from "antd";
import { Link, useLoaderData } from "react-router-dom";
import {
  BarChartOutlined,
  CloseOutlined,
  DeleteOutlined,
  RightOutlined,
} from "@ant-design/icons";
import PageContainer from "../../components/PageContainer";
import VNDCellRender from "../../utils/vnd";
import request from "../../utils/request";

const Cart = () => {
  const [apiContext, contextHolder] = notification.useNotification();
  const [keyRender, setKeyRender] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false
  const [fileList, setFileList] = useState([]);
  const [selectItem, setSelectItem] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [rowSelects, setRowSelects] = useState([]);
  const [datHangs, setDatHangs] = useState([]);
  const loader = useLoaderData();

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
      headerCheckboxSelection: true, // Chọn checkbox cho tất cả các hàng
      checkboxSelection: true,
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

  const onOpen = () => {
    setIsModalOpen(true);
    setDatHangs(rowSelects);
  };
  const onClose = () => {
    setIsModalOpen(false);
    setDatHangs([]);
  };
  const btnThanhToan = () => {
    return (
      <>
        <Button type="primary" onClick={onOpen}>
          Đặt hàng
        </Button>
      </>
    );
  };
  const handleDatHang = () => {
    const total_price = datHangs.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total_price,
      0
    );
    const datHang = async () => {
      try {
        await request.post("order", { datHangs, total_price });
        apiContext.success({
          message: "Thành công",
          description: "Đặt hàng thành công",
        });
      } catch (error) {
        apiContext.error({
          message: "Thất bại",
          description: "Đặt hàng không thành công",
        });
      }
    };
    datHang();
  };
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
        onBtnOther={setRowSelects}
        errApi="Lấy thông tin người dùng thất bại"
        btnOther={btnThanhToan()}
        noData="Không có người dùng nào"
      />
      <Drawer title="Đặt hàng" width={500} onClose={onClose} open={isModalOpen}>
        <List
          itemLayout="horizontal"
          dataSource={datHangs}
          footer={
            <div className="flex flex-col">
              <p className="text-center text-lg font-semibold mb-3">
                Tổng tiền:{" "}
                {VNDCellRender({
                  data: datHangs.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.total_price,
                    0
                  ),
                })}
              </p>
              <Button type="primary" onClick={handleDatHang}>
                Đặt hàng
              </Button>
            </div>
          }
          renderItem={(item, index) => (
            <List.Item
              extra={
                <Tooltip title={"Xóa"}>
                  <Button
                    shape="circle"
                    icon={<CloseOutlined />}
                    type="text"
                    onClick={() => {
                      const newDatHang = datHangs.filter(
                        (x) => x.id != item.id
                      );
                      setDatHangs(newDatHang);
                    }}
                  />
                </Tooltip>
              }
              actions={[
                <div className="flex flex-col">
                  <InputNumber
                    min={1}
                    defaultValue={item.so_luong}
                    onChange={(value) => {
                      const newItem = {
                        ...item,
                        so_luong: value,
                        total_price: item.product.price * value,
                      };
                      const newDatHang = datHangs.map((x, index) => {
                        if (x.id == item.id) {
                          return newItem;
                        }
                        return x;
                      });
                      setDatHangs(newDatHang);
                    }}
                  />
                  <p className="my-3 text-slate-950">
                    {VNDCellRender({ data: item.total_price })}
                  </p>
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    width={100}
                    src={`http://localhost:8000${item.product.image}`}
                  />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.product.name}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

const ActionCellRender = ({ onEditItem, onDeleteItem, data }) => {
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

export default Cart;
