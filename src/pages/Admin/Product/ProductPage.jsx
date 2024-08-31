import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Tooltip } from "antd";
import { useState } from "react";
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
      options: [
        {
          value: "1",
          label: "Apple",
        },
        {
          value: "2",
          label: "Sony",
        },
        {
          value: "3",
          label: "Android",
        },
        {
          value: "4",
          label: "Nokia",
        },
      ],
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
  return (
    <>
      {contextHolder}
      <PageContainer
        title="Quản lý sản phẩm"
        column={column}
        api={() => request.get("product")}
        setIsModalOpen={setIsModalOpen}
        apicontext={apicontext}
        key={keyRender}
        errApi="Lấy thông tin sản phẩm thất bại"
        titleCreate="Thêm sản phẩm"
        noData="Không có sản phẩm nào"
      />
      <CreateNEditHasFile
        show={isModalOpen}
        setShow={setIsModalOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        item={item}
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
