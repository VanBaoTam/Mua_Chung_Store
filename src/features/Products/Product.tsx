import { createSlice } from "@reduxjs/toolkit";
import { listProducts } from "../../dummy/list-Products";
import { ProductModel } from "../../models";

const initialState = {
  Products: listProducts,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});
export default productSlice.reducer;
