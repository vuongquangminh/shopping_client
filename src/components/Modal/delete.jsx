import { Modal, Result } from "antd";
import request from "../../utils/request";

const ModalDelete = ({
  open,
  setOpen,
  name,
  api,
  apicontext,
  setKeyRender,
}) => {
  const handleOk = () => {
    const apiDelete = async () => {
      try {
        const res = await request.delete(api);
        // console.log("res: ", res);
        apicontext.success({
          message: "Thất bại",
          description: `Xóa ${name} thành công`,
        });
        setKeyRender(Math.random());
      } catch (error) {
        apicontext.error({
          message: "Thất bại",
          description: `Xóa ${name} không thành công!`,
        });
      } finally {
        setOpen(false);
      }
    };
    apiDelete();
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal title="" open={open} onOk={handleOk} onCancel={handleCancel}>
        <Result
          status="warning"
          title={
            <>
              Bạn có chắc chắn muốn xóa{" "}
              <span className="text-red-500 font-bold">{name}</span> này không?
              Hành động này sẽ không được hoàn tác.
            </>
          }
        />
      </Modal>
    </>
  );
};

export default ModalDelete;
