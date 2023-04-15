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
              "LzLKF1l0YcHKq58o7iMAQ57JLZCVtVuSL95UFbF5yoDdkdiLBQdPBIlzUXaTkiCj1zH42qopvZH5s5u3JeB-MWJ4S7uhYDnM7CHZI2gAm6i1s5v26wd_Vb7XKs1Pfur9JEu8IbQUeqDBp7j9QzoeKrEw9cT6y8HCVPnNGN64_dL9o6HGSSN0Hbg26HrtbByHHFeYCt2xcJH0-IKfQUsASbA11cvwswzwV8u2O5QRtczYYKPBMC3YJd-MOX5HnxeR6jKMEn23o3OevNSePgtGAoZWTJSVhz5l0Q88C4Vqj6jAf0f23VMkQnkb2JGUyQSqBO5qDYZIfcuniJL7J6X_8Efk7DkCOG",
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
