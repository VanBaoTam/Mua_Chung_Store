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
    let access_token;
    try {
      access_token = await axios.get(`
    https://app.muachung.co/api/zalo/access_token`);
    } catch (error) {
      console.log(error);
    }
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
            access_token: access_token.data,
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
      (state, products: PayloadAction<any>) => {
        state.isLoaded = true;

        products?.payload.map((item) => {
          console.log(item);
          const product: ProductModel = {
            id: item.id,
            code: item.code,
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            photo_links: item.photo_links,
          };
          state.Products = [...state.Products, product];
        });
      }
    );
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoaded = false;
    });
  },
});

export default productSlice.reducer;
