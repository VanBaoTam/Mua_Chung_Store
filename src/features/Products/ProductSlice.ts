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
              "rvWMDbFoCXpJbXOrN_Ws7zsI7pPHu65_kl0eBbl1Trs8v1OUVi1IGF_ESoeasHTTnyDPCnx8C7-Pe4rITvDkEex-6tPqorW_XC1xSsd9HpgPtZ4H5RTDT9A4DbjpY7KbzByUNtAlN3M1jNjvUAC38wwtPNOYe2uirxP5U0YD4ZpOwMr5NzSu2xYzRJfdjnDpeRXe07UG0oISjciF7zmsVS_OKWi3l7fHqQjU2IYe9tx8hKmf2PqvT_UJHWSfWn9lhP5MCLoN9KdPvWKOET1jFERqCXKHyM1xu-SV7XlfN7RPxmOwD8PuHDZeEYWQuabJvuu77ckaKZhldHTXj5mH75VgD1e",
          },
        }
      );
      console.log(resp.data.data.products);
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
