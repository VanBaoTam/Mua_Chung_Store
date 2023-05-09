import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductModel } from "../../models";
const listOrders: CartProductModel[] = [];
const initialState = {
  Products: listOrders,
  initCode: "",
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.Products = [];
    },
    addProduct: (state, product: PayloadAction<CartProductModel>) => {
      let flag = true; // new product?
      state.Products.find((item) => {
        if (product.payload.code === item.code) {
          item.quantity++;
          flag = false;
        }
      });
      if (flag) state.Products = [...state.Products, product.payload];
    },
    changeQuantity: (state, product) => {
      state.Products.find((item) => {
        if (product.payload.code === item.code) {
          item.quantity = product.payload.amount;
        }
      });
    },
    removeProduct: (state, product) => {
      const filteredState = state.Products.filter((item) => {
        console.log(item.code);
        return item.code !== product.payload.code;
      });
      state.Products = filteredState;
    },
    setOrderCode: (state, action: PayloadAction<string>) => {
      state.initCode = action.payload;
      console.log(action.payload);
    },
  },
});
export const {
  clearCart,
  addProduct,
  removeProduct,
  changeQuantity,
  setOrderCode,
} = orderSlice.actions;
export default orderSlice.reducer;
