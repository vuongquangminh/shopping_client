import { useState, useEffect } from "react";
import request from "../../utils/request";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await request.get("auth/user");
        setUser(response.data);
      } catch (error) {
        setUser(null); // Hoặc xử lý lỗi khác
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false khi hoàn tất
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuth;
