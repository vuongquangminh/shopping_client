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

const ProductViewDetail = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiContext, contextHolder] = notification.useNotification();
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
  });
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100ch" }),
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
  return (
    <>
      {contextHolder}
      <LayoutPage>
        <>
          <div style={containerStyle}>
            <Row className="my-4">
              <Col span={8}>
                <Title
                  level={2}
                  className="mr-6"
                  style={{ marginBottom: "0px" }}
                >
                  Danh sách sản phẩm22
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
              <div className="flex flex-wrap gap-4">
                {data?.product?.map((item) => {
                  return (
                    <Card
                      hoverable
                      style={{ width: 240 }}
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
                  );
                })}
              </div>
            )}
          </div>
          <Pagination
            className="flex justify-end"
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

export default ProductViewDetail;
