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
              "e4LRDEqA9qwZG5qww0ydGgP3MJlf5tK7-5flBU5I5bJeQsnWz4PpVlXHQ7tLNrDfpszCL_vzVa76VdnOsri6PSrmVa-6IsbxjsjfKlbuLd-rBtq7ypDDUTyAC6hhA3Li_HepOV8K3MZ36GPTZ2mNV9q99WJRDZa3bYKZDTi093NZJY4yrKKS2SeE7YcCMG5LWMazLxjA67If06DwY2uQ1Rij1mRn4ZqCwXupDS0o94dT4HumpILc7_ebVHdeEsC1-0fwAkapSKlw0rzZrn5ZRkepSaF_F6aws2X9FFGZLp_ERr4On4yhRD1v6K74LI5ws7eaV_Su2s3pBHfkoMKP4dvwI4pg4I5B",
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
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoaded = false;
    });
  },
});

export default productSlice.reducer;
