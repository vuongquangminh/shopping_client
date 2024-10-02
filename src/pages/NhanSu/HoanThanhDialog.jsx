import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Progress } from "antd";
import { memo, useState } from "react";
import request from "../../utils/request";

const HoanThanhDialog = ({ open, setOpen, item, apicontext, setKeyRender }) => {
  const [percent, setPercent] = useState(() => item?.percent);

  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };
  const handleOk = () => {
    const updateOrder = async () => {
      try {
        await request.post(`cap-nhat-don-hang/${item.id}`, {
          percent: percent,
        });
        apicontext.success({
          message: "Thành công",
          description: "Cập nhật đơn hàng thành công!",
        });
        setKeyRender(Math.random());
      } catch (error) {
        apicontext.error({
          message: "Thất bại",
          description: "Cập nhật đơn hàng không thành công!",
        });
      } finally {
        setOpen(false);
      }
    };
    updateOrder();
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Cập nhật"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Progress percent={percent} type="line" />
        <div className="flex justify-between mt-4">
          <Button.Group>
            <Button onClick={decline} icon={<MinusOutlined />} />
            <Button onClick={increase} icon={<PlusOutlined />} />
          </Button.Group>
          <Button
            type="default"
            style={{ backgroundColor: "#00ab18", color: "white" }}
            onClick={handleOk}
          >
            Hoàn thành
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default memo(HoanThanhDialog);
