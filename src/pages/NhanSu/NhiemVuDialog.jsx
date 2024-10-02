import { Button, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";

const NhiemVuDialog = ({ open, setOpen, item }) => {
  const [nhiemVu, setNhiemVu] = useState([]);

  const columns = [
    {
      title: "Tên người đặt hàng",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số tiền",
      dataIndex: "total_price",
    },
  ];

  useEffect(() => {
    if (item) {
      const data = [
        {
          key: item?.id,
          name: item?.user?.name,
          address: item?.user?.address,
          total_price: item?.total_price,
        },
      ];
      setNhiemVu(data);
    }
  }, [item]);

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("submit: ");
  };
  const handleTuChoi = () => {
    console.log("tu_choi");
  };
  return (
    <>
      <Modal
        title="Nhận nhiệm vụ"
        open={open}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Table columns={columns} dataSource={nhiemVu} pagination={false} />
        <div className="mt-4 flex justify-between">
          <Space className="">
            <Button onClick={handleTuChoi} type="primary" danger>
              Từ chối
            </Button>
          </Space>
          <Space className="">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button onClick={handleSubmit} type="primary">
              Xác nhận
            </Button>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default NhiemVuDialog;
