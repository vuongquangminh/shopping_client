import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import PageContainer from "../../../components/PageContainer";
import request from "../../../utils/request";
import ModalDelete from "../../../components/Modal/delete";
import CreateNEditHasFile from "../../../components/Modal/CreateNEditHasFile";
import VNDCellRender from "../../../utils/vnd";

const ProductPage = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false
  const [keyRender, setKeyRender] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [typeProduct, setTypeProduct] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [loading, setLoading] = useState(false);

  const [typeProductSelect, setTypeProductSelect] = useState();
  const [listChips, setListChips] = useState([]);
  const [listDungLuongs, setListDungLuongs] = useState([]);
  const [listMauSacs, setMauSacs] = useState([]);

  const column = [
    { headerName: "Tên sản phẩm ", field: "name", minWidth: 250 },
    {
      headerName: "Ảnh sản phẩm",
      field: "image",
      minWidth: 100,
      cellRenderer: (data) => {
        return (
          <div className="h-full">
            <img
              className="h-full"
              src={`http://localhost:8000${data.data.image}`}
              alt=""
            />
          </div>
        );
      },
    },
    { headerName: "Tên loại ", field: "type_product.name", minWidth: 200 },
    {
      headerName: "Giá tiền (VND)",
      field: "price",
      cellRenderer: (data) => VNDCellRender({ data: data.data?.price }),
      minWidth: 100,
    },
    { headerName: "Mô tả", field: "description", flex: 1, minWidth: 200 },
    { headerName: "Số lượng hàng", field: "so_luong", minWidth: 100 },

    {
      headerName: "Hành động",
      field: "action",
      minWidth: 100,
      cellRenderer: ActionCellRender,
      cellRendererParams: {
        onEditItem: (item) => {
          setIsEdit(true);
          setItem(item);
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
        field: "name",
        label: "Tên sản phẩm",
        rule: [
          {
            required: true,
            message: "Trường tên sản phẩm không được bỏ trống!",
          },
        ],
      },
      {
        type: "select",
        field: "type_product_id",
        label: "Loại sản phẩm",
        rule: [
          {
            required: true,
            message: "Trường loại sản phẩm không được bỏ trống!",
          },
        ],
        onChange: setTypeProductSelect,
        options: typeProduct.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        }),
      },
      {
        type: "inputNumber",
        field: "price",
        label: "Giá tiền",
      },
      {
        type: "upload",
        field: "image",
        label: "Ảnh sản phẩm",
        fileList: [],
      },
      {
        type: "select",
        field: "camera",
        label: "Camera",
      },
      {
        type: "select",
        field: "image",
        label: "Ảnh sản phẩm",
      },
      {
        type: "select",
        field: "image",
        label: "Ảnh sản phẩm",
      },

      {
        type: "textArea",
        field: "description",
        label: "Mô tả",
      },
      {
        type: "inputNumber",
        field: "so_luong",
        label: "Số lượng hàng",
      },
    ];
    setDataForm(dataForm);
  }, [typeProduct]);

  console.log("typeProductSelect: ", typeProductSelect);

  useEffect(() => {
    const getTypeProduct = async () => {
      setLoading(true);
      try {
        const res = await request.get("type-product");
        res?.data && setTypeProduct(res.data);
      } catch (error) {
        apicontext.error({
          message: "Thất bại",
          description: "Lấy dữ liệu thất bại!",
        });
      } finally {
        setLoading(false);
      }
    };
    const getDungLuongs = async () => {
      setLoading(true);
      try {
        const res = await request.get("list-dung-luongs");
        res?.data && setListDungLuongs(res.data);
      } catch (error) {
        apicontext.error({
          message: "Thất bại",
          description: "Lấy dữ liệu thất bại!",
        });
      } finally {
        setLoading(false);
      }
    };
    getTypeProduct();
    getDungLuongs();
  }, []);

  useEffect(() => {
    const getChips = async () => {
      setLoading(true);
      try {
        const res = await request.post("list-chips", {
          type_product_id: typeProductSelect,
        });
        res?.data && setListChips(res.data);
      } catch (error) {
        apicontext.error({
          message: "Thất bại",
          description: "Lấy dữ liệu thất bại!",
        });
      } finally {
        setLoading(false);
      }
    };
    const getMauSacs = async () => {
      setLoading(true);
      try {
        const res = await request.post("list-mau-sacs", {
          type_product_id: typeProductSelect,
        });
        res?.data && setMauSacs(res.data);
      } catch (error) {
        apicontext.error({
          message: "Thất bại",
          description: "Lấy dữ liệu thất bại!",
        });
      } finally {
        setLoading(false);
      }
    };

    typeProductSelect && getChips();
    typeProductSelect && getMauSacs();
  }, [typeProductSelect]);

  return (
    <>
      {contextHolder}
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <PageContainer
          title="Quản lý sản phẩm"
          column={column}
          api={() => request.post("list-product")}
          setIsModalOpen={setIsModalOpen}
          apicontext={apicontext}
          key={keyRender}
          errApi="Lấy thông tin sản phẩm thất bại"
          titleCreate="Thêm sản phẩm"
          noData="Không có sản phẩm nào"
        />
      )}
      <CreateNEditHasFile
        show={isModalOpen}
        setShow={setIsModalOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        item={{ ...item, img: item?.image }}
        setItem={setItem}
        apicontext={apicontext}
        dataForm={dataForm}
        setKeyRender={setKeyRender}
        apiCreate={`product`}
        apiEdit={item && `product/${item?.id}`}
        titleCreate={"Thêm sản phẩm mới"}
        titleEdit={"Chỉnh sửa sản phẩm"}
        fileName="image"
      />

      <ModalDelete
        open={modalDelete}
        setOpen={setModalDelete}
        name={item?.name}
        api={`product/${item?.id}`}
        apicontext={apicontext}
        setKeyRender={setKeyRender}
      />
    </>
  );
};

export default ProductPage;

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
    </>
  );
};
