import { createSlice } from "@reduxjs/toolkit";
import { listProducts } from "../../dummy/list-Products";

const initialState = {
  Products: listProducts,
};
const product = createSlice({
  name: "products",
  initialState,
  reducers: {},
});
export default product.reducer;
