import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listOrders } from "../../dummy/list-Order";
import { OrderModel } from "../../models";
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
    addProduct: (state, product: PayloadAction<OrderModel>) => {
      state.Products = [...state.Products, product.payload];
    },
  },
});
export const { clearCart, addProduct } = orderSlice.actions;
export default orderSlice.reducer;