const VNDCellRender = ({ data }) => {
  const formattedVND = data?.toLocaleString("vi-VN") + " VND";
  return formattedVND;
};

export default VNDCellRender;
