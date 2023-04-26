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
              "rn1k6CYVV0xJ7cuRn9Lu3TqQPnZAZHC0a5vI4DEA8rFC1cmaY-v-Gf4W42lmwm5YlGXADk3M8L3x5c8-dTO4HCiQMXVNuKr0o0ej4z3wMqgtBmizeTTkQkW5F0EAzYyMo11mMxNP0JhMLXPhlu5tPgLeCJB6Y5rrZ7q2PDkJSI2dN0ummfGPHTrCQmZ4WtLHdLOrDegrLrIHRGKGy8qL0wfjLnJVX4XYaMuj6ysjIGAkN01ozOeJEunTO46HZImN_K1_6hUH7rtDVarDh_uQ0xW3MLhlxZyuimLITV_rAY3eVcfKawaVJEuZG2Ujo0feu24KAe7BPdYNFIneOLylkISWp8Tw20",
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
