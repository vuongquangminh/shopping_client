import { useEffect, useMemo, useState } from "react";
import LayoutPage from "../components/LayoutPage";
import Title from "antd/es/typography/Title";
import {
  Button,
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
import request from "../utils/request";
import VNDCellRender from "../utils/vnd";

const ProductView = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiContext, contextHolder] = notification.useNotification();
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100ch" }),
    []
  );

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await request.post("list-product");
        console.log("res: ", res);
        res?.data && setProduct(res.data);
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
  }, []);

  const onChangePage = (page, pageSize) => {
    console.log(page, pageSize);
  };
  return (
    <>
      {contextHolder}
      <LayoutPage>
        {loading ? (
          <Spin />
        ) : (
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
                    <Input placeholder="TÌm kiếm" />
                    <Button type="primary">Tìm kiếm</Button>
                  </Space.Compact>
                </Col>
                <Col span={8}></Col>
              </Row>
              <div className="flex flex-wrap gap-4">
                {product.map((item) => {
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
            </div>
            <Pagination
              className="flex justify-end"
              showSizeChanger
              onChange={onChangePage}
              defaultCurrent={3}
              total={500}
            />
          </>
        )}
      </LayoutPage>
    </>
  );
};

export default ProductView;
