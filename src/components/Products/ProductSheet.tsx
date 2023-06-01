import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Radio, Sheet } from "zmp-ui";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router";
import { ConvertPrice, ConvertSalePrice } from "../../utils/Prices";
import { addProduct } from "../../features/Order/OrderSlice";
import { CartProductModel } from "../../models";
const ProductSheet = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sheetVisible, setSheetVisible] = useState(true);
  const [amount, setAmount] = useState(1);
  function handleAmount() {
    if (amount > 1) setAmount((prev) => prev - 1);
  }
  const productList = useAppSelector((store) => store.products);
  const param = useParams();
  const product = productList.Products.find((item) => item.id === param.code)!;
  function handleAdd() {
    let orderProduct: CartProductModel = {
      ...product,
      quantity: amount,
    };
    if (product.sales[0].sale_percent !== 0)
      orderProduct = {
        ...product,
        quantity: amount,
        price: props.salePrice,
      };
    console.log(orderProduct);
    dispatch(addProduct(orderProduct));
    setSheetVisible(false);
    props.handleShown();
  }
  function handleClose() {
    setSheetVisible(false);
    props.handleShown();
  }
  console.log(props);
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
        <img
          src={product.photo_links}
          alt="Product's image"
          className="w-1/3"
        />
        <div className="grow text-base px-2 ">
          <h4 className="font-bold text-lg">{product.name}</h4>
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
            {product.sales[0].sale_percent == 0 ? (
              <span className="text-red-400 pr-2 font-semibold text-lg">
                {ConvertPrice(product.price, 1)}đ
              </span>
            ) : (
              <>
                <span className="text-black line-through">
                  {ConvertPrice(product.price, 1)}đ{" "}
                </span>
                <br />
                <span className="text-red-400 font-semibold text-lg">
                  SALES: {ConvertPrice(props.salePrice, 1)}đ
                </span>
              </>
            )}
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
          style={{ backgroundColor: "#fccfcf" }}
          onClick={() => navigate("/cart")}
        >
          Đến giỏ hàng
        </Button>
        <Button
          size="medium"
          style={{ backgroundColor: "#f6bebe" }}
          onClick={handleAdd}
        >
          Thêm vào giỏ hàng
        </Button>
      </Box>
    </Sheet>
  );
};

export default ProductSheet;
