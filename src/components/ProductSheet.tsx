import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Radio, Sheet } from "zmp-ui";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router";
import { ConvertPrice } from "../utils/ConvertPrice";
import { addProduct } from "../features/Order/OrderSlice";
import { OrderModel } from "../models";
const ProductSheet = (props) => {
  let size = "S",
    color = "Đỏ";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sheetVisible, setSheetVisible] = useState(true);
  const [amount, setAmount] = useState(1);
  function handleAmount() {
    if (amount > 1) setAmount((prev) => prev - 1);
  }
  const productList = useAppSelector((store) => store.products);
  const param = useParams();
  const product = productList.Products.find((item) => item.id === param.id)!;
  function handleAdd() {
    let orderProduct: OrderModel = {
      ...product,
      size: size,
      color: color,
      quantity: amount,
    };
    dispatch(addProduct(orderProduct));
    setSheetVisible(false);
    props.handleShown();
  }
  function handleClose() {
    setSheetVisible(false);
    props.handleShown();
  }
  return (
    <Sheet
      height={500}
      visible={sheetVisible}
      onClose={handleClose}
      autoHeight
      mask
      handler
      swipeToClose
      title="Chọn chi tiết"
    >
      <Box flex p={4}>
        <img src={product.imgProduct} alt="Product's image" className="w-1/3" />
        <div className="grow text-base">
          <h4 className="font-bold h-3 text-lg">{product.nameProduct}</h4>
          <p className="text-red-600 mt-4 text-sm "></p>
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
              {ConvertPrice(Number(product.salePrice), amount)}
            </span>
          </div>
        </div>
      </Box>

      <Box py={1} px={3} flex flexDirection="column" flexWrap={true}>
        <h4>Size:</h4>
        <Radio.Group
          defaultValue="S"
          name="S"
          size="medium"
          onChange={(value) => (size = value.toString())}
        >
          <Radio size="small" name="S" value="S" label="S" className="p-2" />
          <Radio size="small" name="M" value="M" label="M" className="p-2" />
          <Radio size="small" name="L" value="L" label="L" className="p-2" />
          <Radio size="small" name="XL" value="XL" label="XL" className="p-2" />
        </Radio.Group>
      </Box>
      <Box py={1} px={3} flex flexDirection="column" flexWrap={true}>
        <h4>Màu sắc:</h4>
        <Radio.Group
          defaultValue="Đỏ"
          name="Đỏ"
          size="medium"
          onChange={(value) => (color = value.toString())}
        >
          <Radio size="small" name="Đỏ" value="Đỏ" label="Đỏ" className="p-2" />
          <Radio
            size="small"
            name="Xanh"
            value="Xanh"
            label="Xanh"
            className="p-2"
          />
          <Radio
            size="small"
            name="Đen"
            value="Đen"
            label="Đen"
            className="p-2"
          />
          <Radio
            size="small"
            name="Trắng"
            value="Trắng"
            label="Trắng"
            className="p-2"
          />
        </Radio.Group>
      </Box>
      <Box
        flex
        justifyContent="space-around"
        p={4}
        className="absolute bottom-0 w-full"
      >
        <Button
          size="medium"
          variant="secondary"
          onClick={() => navigate("/cart")}
        >
          Đến giỏ hàng
        </Button>
        <Button size="medium" onClick={handleAdd}>
          Thêm vào giỏ hàng
        </Button>
      </Box>
    </Sheet>
  );
};

export default ProductSheet;
