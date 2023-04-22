import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductModel } from "../../models";

const initArr: ProductModel[] = [];
const initialState = {
  Products: initArr,
  isLoaded: false,

};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (name, thunk) => {
    try {
      const resp = await axios.get(
        "https://openapi.zalo.me/v2.0/mstore/product/getproductofoa?offset=0&limit=10",
        {
          params: {
            offset: "0",
            limit: "10",
          },
          headers: {
            "Content-Type": "application/json",
            access_token:
              "cezzJPcrQa-VZdX6dBLjGPgBUqUShX47ovDSHOsW6WQB_tnFuS4DDPUh6375mqf5fODS7TdPFH-eu4vTggWmNFF0NGQqWZPLiRWXLhVqVJRnaGrNZjbu1T6e2mABbqLGWFegDkd3E7IVfYKTnjnsLBsY1X7Qv74KizmF5jY8IXAIyIbXohHT6vhnEa-OYN16wBPd8ghM5YUgdqCaeU8HMAgS13hkscr2fPu4HUJVHZFYXor7dlauFTccR3pQuICrlDjJPBQf3oVI-4n6sOSh5A-_MNpi-WyKc80J7E3S0qQZXny_m-LUGfgSBHd0yqfWogqZ6QcVNMRU_Zyace8lGpCB932TgcjE",
          },
        }
      );

      return resp.data.data.products;
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
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoaded = false;
    });
  },
});

export default productSlice.reducer;
