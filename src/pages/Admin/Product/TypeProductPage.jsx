import { Button, notification, Tooltip } from "antd";
import PageContainer from "../../../components/PageContainer";
import request from "../../../utils/request";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateNEdit from "../../../components/Modal/CreateNEdit";
import ModalDelete from "../../../components/Modal/delete";

const TypeProductPage = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false
  const [keyRender, setKeyRender] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState();
  const [modalDelete, setModalDelete] = useState(false);

  const column = [
    { headerName: "Tên loại ", field: "name", minWidth: 250 },
    { headerName: "Mô tả", field: "description", flex: 1 },

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
      label: "Tên loại",
      rule: [
        {
          required: true,
          message: "Trường tên loại không được bỏ trống!",
        },
      ],
    },
    {
      type: "textArea",
      field: "description",
      label: "Mô tả",
    },
  ];

  return (
    <>
      {contextHolder}
      <PageContainer
        title="Quản lý loại sản phẩm"
        column={column}
        api={() => request.get("type-product")}
        setIsModalOpen={setIsModalOpen}
        apicontext={apicontext}
        key={keyRender}
        errApi="Lấy thông tin loại sản phẩm thất bại"
        titleCreate="Thêm loại sản phẩm"
        noData="Không có loại sản phẩm nào"
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
        apiCreate={`type-product`}
        apiEdit={item && `type-product/${item?.id}`}
        titleCreate={"Thêm loại sản phẩm mới"}
        titleEdit={"Chỉnh sửa loại sản phẩm"}
      />

      <ModalDelete
        open={modalDelete}
        setOpen={setModalDelete}
        name={item?.name}
        api={`type-product/${item?.id}`}
        apicontext={apicontext}
        setKeyRender={setKeyRender}
      />
    </>
  );
};

export default TypeProductPage;

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
