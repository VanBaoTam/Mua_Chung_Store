import React from "react";
import { Box, Page, Text } from "zmp-ui";
import { ConvertPrice } from "../../utils/Prices";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
  const location = useLocation();
  const { props } = location.state;
  let total = 0;
  return (
    <Page hideScrollbar={true}>
      <Box>
        <Box
          key={props._id}
          mx={4}
          my={2}
          px={4}
          py={2}
          className=" bg-white rounded-lg  font-semibold"
        >
          <Box
            py={2}
            flex
            justifyContent="space-between"
            className="font-semibold"
          >
            <Text bold>Sản phẩm </Text>
            <Text bold>Số lượng</Text>
            <Text bold>Giá thành</Text>
          </Box>
          <Box py={2} flex flexDirection="column">
            {props.order?.map((product) => {
              total += product.productData.quantity;
              return (
                <Box
                  mt={4}
                  flex
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <img
                    style={{ width: "70px" }}
                    src={product.productData.photo_link}
                    alt="product's image"
                  />
                  <Text>{product.productData.quantity}</Text>
                  <Text>
                    {ConvertPrice(
                      product.productData.quantity * product.productData.price,
                      1
                    )}
                    &nbsp; VNĐ
                  </Text>
                </Box>
              );
            })}
          </Box>
          <Box flex flexDirection="column">
            <Text bold>Tổng sản phẩm: {total}</Text>
            <Text bold>Tổng tiền: {ConvertPrice(props.finalCost, 1)}VNĐ</Text>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default OrderDetail;
