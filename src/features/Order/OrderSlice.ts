import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductModel } from "../../models";
const listOrders: CartProductModel[] = [];
const initialState = {
  Products: listOrders,
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.Products = [];
    },
    addProduct: (state, product: PayloadAction<CartProductModel>) => {
      state.Products = [...state.Products, product.payload];
    },
  },
});
export const { clearCart, addProduct } = orderSlice.actions;
export default orderSlice.reducer;
