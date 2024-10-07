import { useEffect, useMemo, useState } from "react";
import LayoutPage from "../../components/LayoutPage";
import Title from "antd/es/typography/Title";
import {
  Card,
  Col,
  Input,
  notification,
  Pagination,
  Row,
  Space,
  Spin,
} from "antd";
import Meta from "antd/es/card/Meta";
import request from "../../utils/request";
import VNDCellRender from "../../utils/vnd";
import { Link } from "react-router-dom";
import { BarChartOutlined } from "@ant-design/icons";
import useAuth from "../../components/RoutePrivate/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCart } from "../../store/feature/featureCartSlice";

const ProductView = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiContext, contextHolder] = notification.useNotification();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.featureCart);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
  });
  const containerStyle = useMemo(
    () => ({ width: "100%", minHeight: "500px" }),
    []
  );

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await request.post("list-product-user", {
          ...paginate,
          search,
        });
        res?.data && setData(res.data);
      } catch (error) {
        apiContext.error({
          message: "Thất bại",
          description: "Lấy dữ liệu thất bại!",
        });
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [paginate, search]);

  const onSearch = (value) => {
    setSearch(value);
  };
  const onChangePage = (page, pageSize) => {
    setPaginate({
      page,
      pageSize,
    });
  };
  const pathHeader = useMemo(() => {
    const results = [
      {
        label: "Danh sách sản phẩm",
        key: "/danh-sach-san-pham",
        icon: <BarChartOutlined />,
      },
      {
        label: "Khuyến mại",
        key: "/khuyen-mai",
        icon: <BarChartOutlined />,
      },
      {
        label: "Đơn hàng",
        key: "/don-hang",
        icon: <BarChartOutlined />,
      },
    ];
    return results;
  }, []);

  useEffect(() => {
    const getCartByUser = async () => {
      if (user) {
        dispatch(fetchDataCart(user.id)); // Truyền userId khi gọi API
      }
    };
    getCartByUser();
  }, [user]);

  return (
    <>
      {contextHolder}
      <LayoutPage urlPathHeader={pathHeader} countCart={items.length}>
        <>
          <div style={containerStyle}>
            <Row className="my-4">
              <Col span={8}>
                <Title
                  level={2}
                  className="mr-6"
                  style={{ marginBottom: "0px" }}
                >
                  Danh sách sản phẩm
                </Title>
              </Col>
              <Col span={8}>
                <Space.Compact className="flex-1">
                  <Input
                    placeholder="TÌm kiếm"
                    onPressEnter={(e) => onSearch(e.target.value)}
                  />
                  {/* <Button type="primary" onClick={}>Tìm kiếm</Button> */}
                </Space.Compact>
              </Col>
              <Col span={8}></Col>
            </Row>
            {loading ? (
              <div className="flex justify-center items-center">
                <Spin />
              </div>
            ) : (
              <div
                className={
                  data?.product?.length > 0
                    ? "flex flex-wrap gap-4 justify-center"
                    : "flex justify-center mt-5"
                }
              >
                {data?.product?.length > 0 ? (
                  data?.product?.map((item) => {
                    return (
                      <Link to={"" + item.id}>
                        <Card
                          className="shadow"
                          hoverable
                          style={{
                            width: 240,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            justifyContent: "space-between",
                          }}
                          cover={
                            <img
                              alt="anh-san-pham"
                              src={`http://localhost:8000${item.image}`}
                            />
                          }
                        >
                          <Meta
                            title={item.name}
                            description={VNDCellRender({ data: item.price })}
                          />
                        </Card>
                      </Link>
                    );
                  })
                ) : (
                  <p className="flex justify-center mt-5">
                    Không có sản phẩm nào!
                  </p>
                )}
              </div>
            )}
          </div>
          <Pagination
            className="flex justify-end my-4"
            showSizeChanger
            pageSizeOptions={[5, 10, 20, 50]}
            defaultPageSize={10}
            onChange={onChangePage}
            defaultCurrent={paginate.page}
            total={data?.total}
          />
        </>
      </LayoutPage>
    </>
  );
};

export default ProductView;
