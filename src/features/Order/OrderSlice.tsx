import { createSlice } from "@reduxjs/toolkit";
import { listOrders } from "../../dummy/list-Order";

const initialState = {
  Products: listOrders,
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});
export default orderSlice.reducer;
