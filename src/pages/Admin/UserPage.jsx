import PageContainer from "../../components/PageContainer";
import request from "../../utils/request";

const UserPage = () => {
  const column = [
    { field: "name" },
    { field: "email" },
    { field: "avatar" },
    { field: "phone" },
    { field: "address" },
  ];
  return (
    <PageContainer
      title="Quản lý người dùng"
      column={column}
      api={() => request.get("user")}
    />
  );
};

export default UserPage;
