import { Button, Modal, Space, Table } from "antd";
import { memo, useEffect, useState } from "react";
import request from "../../utils/request";
import VNDCellRender from "../../utils/vnd";

const NhiemVuDialog = ({ open, setOpen, item, apicontext, setKeyRender }) => {
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
          total_price: VNDCellRender({ data: item?.total_price }),
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
    const xacNhan = async () => {
      try {
        await request.post(`xac-nhan-nhiem-vu/${item.id}`, {
          req: "xac_nhan",
        });
        apicontext.success({
          message: "Thành công",
          description: "Xác nhận đơn hàng thành công!",
        });
        setKeyRender(Math.random());
      } catch (error) {
        apicontext.success({
          message: "Thất bại",
          description: "Xác nhận đơn hàng thất bại!",
        });
      } finally {
        setOpen(false);
      }
    };
    xacNhan();
  };
  const handleTuChoi = () => {
    const xacNhan = async () => {
      try {
        await request.post(`xac-nhan-nhiem-vu/${item.id}`, {
          req: "tu_choi",
        });
        apicontext.success({
          message: "Thành công",
          description: "Từ chối đơn hàng thành công!",
        });
        setKeyRender(Math.random());
      } catch (error) {
        apicontext.success({
          message: "Thất bại",
          description: "Từ chối đơn hàng thất bại!",
        });
      } finally {
        setOpen(false);
      }
    };
    xacNhan();
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

export default memo(NhiemVuDialog);
