import React, { useState } from "react";
import { Box, Button, Sheet } from "zmp-ui";
import { useAppDispatch } from "../../hooks/hooks";
import { ConvertPrice } from "../../utils/Prices";
import { changeQuantity, removeProduct } from "../../features/Order/OrderSlice";

function CartSheet(props) {
  const dispatch = useAppDispatch();
  const [sheetVisible, setSheetVisible] = useState(true);
  const [amount, setAmount] = useState(props.quantity);
  function handleAmount() {
    if (amount > 1) setAmount((prev) => prev - 1);
  }
  function handleConfirm() {
    const payload = { code: props.code, amount: amount };
    dispatch(changeQuantity(payload));
    handleClose();
  }
  function handleRemove() {
    const payload = { code: props.code };
    dispatch(removeProduct(payload));
    handleClose();
    setTimeout(() => {
      props.handleRemove();
    }, 100);
  }
  function handleClose() {
    setSheetVisible(false);
    props.handleShown();
  }
  return (
    <Sheet
      height={600}
      visible={sheetVisible}
      onClose={handleClose}
      autoHeight
      handler
      swipeToClose
      title="Chọn chi tiết"
    >
      <Box flex p={4}>
        <img src={props.photo_links} alt="Product's image" className="w-1/3" />
        <div className="grow text-base px-2 ">
          <h4 className="font-bold text-lg">{props.name}</h4>
          <p className="text-red-400 mt-4 text-sm "></p>
          <div className="mt-3">
            <span>Số lượng</span>
            <button className="ml-4" onClick={() => handleAmount()}>
              -
            </button>
            <span className="ml-4">{amount}</span>
            <button
              className="ml-4"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <div className="mt-3">
            <span>Tổng tiền: </span>
            <span className="text-red-400">
              {ConvertPrice(Number(props.price), amount)}đ
            </span>
          </div>
        </div>
      </Box>

      <Box
        flex
        justifyContent="space-around"
        p={4}
        className="absolute bottom-0 w-full"
      >
        <Button
          size="medium"
          style={{ backgroundColor: "gray" }}
          onClick={handleRemove}
        >
          Xóa khỏi giỏ hàng
        </Button>
        <Button
          size="medium"
          style={{ backgroundColor: "#f6bebe" }}
          onClick={handleConfirm}
        >
          Xác nhận
        </Button>
      </Box>
    </Sheet>
  );
}

export default CartSheet;
