import React, { useState } from "react";
import { Page, Button, Text, Modal, Box } from "zmp-ui";
import { ConvertPrice } from "../../utils/Prices";
import { useAppDispatch } from "../../hooks/hooks";
import { setIsShown } from "../../features/PreviousUser/PreviousSlice";
import { BsPlusCircle } from "react-icons/bs";
import { addProduct } from "../../features/Order/OrderSlice";
import { CartProductModel } from "../../models";

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
      <Box>
        <Box>
          <Text bold>Mã mua chung:</Text>
          <Text>{props.groupbuyId}</Text>
          <Box mt={2}>
            <Text bold>List sản phẩm:</Text>
            <Box py={2} px={4} flex justifyContent="space-between">
              <Text>Ảnh</Text>
              <Text>Tên sản phẩm</Text>
              <Text></Text>
            </Box>
            {props.order?.map((item) => {
              return (
                <Box
                  key={item._id}
                  flex
                  mt={4}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <img
                    style={{ width: "70px", height: "90px" }}
                    className="w-20 h-20"
                    src={item.productData.photo_link}
                    alt="order's image"
                  />
                  <p
                    className=" block max-w-xs overflow-hidden"
                    style={{
                      width: "120px",
                      paddingLeft: "10px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.productData.product_name}
                  </p>
                  <Box width={50}>
                    <Button
                      fullWidth={true}
                      size="small"
                      style={{
                        backgroundColor: "#BE3455",
                        boxShadow:
                          "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                      }}
                      onClick={() => {
                        const payload: CartProductModel = {
                          code: item.productData.code,
                          name: item.productData.product_name,
                          photo_links: item.productData.photo_link,
                          price: item.productData.price,
                          quantity: 1,
                        };

                        dispatch(addProduct(payload));
                      }}
                    >
                      <BsPlusCircle />
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box py={4} flex justifyContent="space-between"></Box>
          <Button
            onClick={() => {
              dispatch(setIsShown());
              setPopupVisible(false);
            }}
            style={{
              backgroundColor: "#BE3455",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
            fullWidth
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
