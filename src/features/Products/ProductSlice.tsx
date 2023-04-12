import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductModel } from "../../models";
const initArr: ProductModel[] = [];
const url =
  "https://sheet.best/api/sheets/2f29ede6-ebf8-4d55-990c-f18ee5f4b02f";
const initialState = {
  Products: initArr,
  isLoaded: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (name, thunk) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, products: PayloadAction<ProductModel[]>) => {
        state.isLoaded = true;
        state.Products = products.payload;
      }
    );
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoaded = false;
    });
  },
});

export default productSlice.reducer;
