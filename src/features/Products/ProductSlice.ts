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
              "1ICR5MAUEpG69XqRPvixE0Cb6HfcWtreMNnO6K_6UZXT6W8NJgfFKtnB4G1vytDZ6YaTG2liRo8rLK9WLkLZ0rSl6rLknY81Ko1WGd3W1Xn71MLfUjWQCLuvIM1Jyn14Iaz-Dcoa7KHL0J5hRSjD7NGfF7jlw4S6VLbgU6YuBYGHTbLASOGu3K0vPt9tsnKkQc9RNMh75WXaBKfEG-1kQtCS3HjletThMb5R1NwQF5aOVt0y58qfT6rA3ZbIkqzaJ48VIrUaP3WxOpf5EvbK2XTUTIboaH0ETqimMbcaS2vXJrHwOP8v9NbF6bb4zdW6M2iXM5xhP1f_1oTEOzfX7bI851TbXJqn",
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
