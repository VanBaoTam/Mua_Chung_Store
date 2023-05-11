import React, { useState } from "react";
import { Page, Button, Text, Modal, Box } from "zmp-ui";
import { ConvertPrice } from "../../utils/Prices";
import { useAppDispatch } from "../../hooks/hooks";
import { setIsShown } from "../../features/PreviousUser/PreviousSlice";

export default function PreviousModal(props) {
  const [popupVisible, setPopupVisible] = useState(true);
  const dispatch = useAppDispatch();
  return (
    <Modal
      visible={popupVisible}
      title="Giỏ hàng của người mời bạn"
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box p={4}>
        <Box>
          <Text bold>Mã mua chung:</Text>
          <Text>{props.groupbuyId}</Text>
          <Box mt={2}>
            <Text bold>List sản phẩm:</Text>
            <Box py={2} flex justifyContent="space-between">
              <Box>
                <Text>Sản phẩm</Text>
              </Box>
              <Box>
                <Text>Số lượng</Text>
              </Box>
              <Box>
                <Text>Giá</Text>
              </Box>
            </Box>
            {props.order?.map((item) => {
              return (
                <Box
                  key={item._id}
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
          <Box px={4} py={4} flex justifyContent="space-between">
            <Text bold>Tổng tiền:</Text>
            <Text>{ConvertPrice(props.finalCost, 1)}đ</Text>
          </Box>
          <Button
            onClick={() => {
              dispatch(setIsShown());
              setPopupVisible(false);
            }}
            style={{ backgroundColor: "#f6bebe" }}
            fullWidth
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
