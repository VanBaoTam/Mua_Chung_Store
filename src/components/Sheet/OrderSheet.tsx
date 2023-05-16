import React, { useState, useEffect } from "react";
import { Box, Sheet, Text } from "zmp-ui";
import { handlegetGroupBuyIdFromOrders } from "../../services/User";
import { ConvertPrice } from "../../utils/Prices";
import ShareId from "../Buttons/ShareId";
const OrderSheet = (props) => {
  const [sheetVisible, setSheetVisible] = useState(true);
  const [idGroupBuy, setIdGroupBuy] = useState<string>();
  function handleClose() {
    setSheetVisible(false);
    props.handleShown();
  }
  async function handleGetGroupBuyId() {
    const resp = await handlegetGroupBuyIdFromOrders(
      props.userId,
      props.orderId
    );
    setIdGroupBuy(resp);
  }
  function handleConfirm() {
    setSheetVisible(false);
    props.handleShown();
  }
  useEffect(() => {
    handleGetGroupBuyId();
  }, []);

  return (
    <Sheet
      height={800}
      visible={sheetVisible}
      onClose={handleClose}
      autoHeight
      handler
      swipeToClose
      title="Chọn chi tiết"
    >
      <Box p={2}>
        <Text bold>Mã mua chung:</Text>
        <Text>{idGroupBuy}</Text>
        <Box mt={2}>
          <Text bold>List sản phẩm:</Text>
          <Box p={4} px={6} flex justifyContent="space-between">
            <Box>
              <Text>Sản phẩm</Text>
            </Box>
            <Box ml={10} width={70}>
              <Text>Số lượng</Text>
            </Box>
            <Box ml={8} width={80} textAlign="right">
              <Text>Giá</Text>
            </Box>
          </Box>
          {props.order?.map((item) => {
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
          <Text>{ConvertPrice(props.finalCost, 1)}đ</Text>
        </Box>
      </Box>
      <div className="fixed bottom-0 bg-white w-full flex justify-between  px-4 py-1 ">
        <ShareId
          username={props.username}
          idGroupBuy={idGroupBuy}
          orderId={props.orderId}
          userId={props.userId}
          handleConfirm={handleConfirm}
        />
      </div>
    </Sheet>
  );
};

export default OrderSheet;
