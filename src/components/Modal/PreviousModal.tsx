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
            <Box py={2} px={1} flex justifyContent="space-between">
              <Text>Tên sản phẩm</Text>
              <Text>Ảnh</Text>
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
                  <p
                    className=" block max-w-xs overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.productData.product_name}
                  </p>
                  <img
                    className="w-20 h-20"
                    src={item.productData.photo_link}
                    alt="order's image"
                  />
                </Box>
              );
            })}
          </Box>
          <Box py={4} flex justifyContent="space-between">
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
