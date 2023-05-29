import React, { useEffect, useState } from "react";
import { Box, Page, Text } from "zmp-ui";
import {
  handlegetGroupBuyIdFromOrders,
  handlegetOrderDetailsFromOrders,
} from "../../services/User";
import { ConvertPrice } from "../../utils/Prices";
import ShareId from "../../components/Buttons/ShareId";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import Loading from "../../components/Modal/Loading";

function OrderDetails() {
  const { orderId } = useParams();
  const userInfo = useAppSelector((store) => store.user.userInfo);
  const [idGroupBuy, setIdGroupBuy] = useState<string>();
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  async function handleGetGroupBuyId() {
    const resp = await handlegetGroupBuyIdFromOrders(userInfo.id, orderId!);
    setIdGroupBuy(resp);
  }
  async function handleGetOrderDetail() {
    const resp = await handlegetOrderDetailsFromOrders(userInfo.id, orderId!);
    setOrderInfo(resp);
  }
  useEffect(() => {
    async function handleGetData() {
      await handleGetGroupBuyId();
      await handleGetOrderDetail();
    }
    handleGetData();
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <Page hideScrollbar={true}>
      {" "}
      {isLoaded ? null : <Loading />}
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
        flexDirection="column"
      >
        {orderInfo && (
          <>
            <Box>
              <Text bold>Mã mua chung:</Text>
              <Text>{idGroupBuy}</Text>
              <Box mt={2}>
                <Text bold>List sản phẩm:</Text>
                <Box p={4} px={2} flex justifyContent="space-between">
                  <Box width={80}>
                    <Text>Sản phẩm</Text>
                  </Box>
                  <Box ml={10} width={60}>
                    <Text>Số lượng</Text>
                  </Box>
                  <Box ml={8} width={80} textAlign="right">
                    <Text>Giá</Text>
                  </Box>
                </Box>
                {orderInfo.order?.map((item) => {
                  return (
                    <Box
                      key={item._id}
                      p={2}
                      flex
                      justifyContent="space-between"
                      mt={1}
                      alignItems="center"
                    >
                      <img
                        className="w-20 h-20"
                        src={item.productData.photo_link}
                        alt="order's image"
                      />
                      <Text>{item.productData.quantity}</Text>
                      <Text> {ConvertPrice(item.productData.price, 1)}đ</Text>
                    </Box>
                  );
                })}
              </Box>
              <Box px={4} flex justifyContent="space-between">
                <Text bold>Tổng tiền:</Text>
                <Text>{ConvertPrice(orderInfo.finalCost, 1)}đ</Text>
              </Box>
            </Box>
            <div className="h-20"></div>
            <ShareId
              username={userInfo.name}
              idGroupBuy={idGroupBuy}
              orderId={orderInfo.orderId}
              userId={orderInfo.userId}
            />
          </>
        )}
      </Box>
    </Page>
  );
}

export default OrderDetails;
