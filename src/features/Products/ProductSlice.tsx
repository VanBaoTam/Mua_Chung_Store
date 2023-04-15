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
              "hB5i5VmTNGclj6eR-HXT1QgtRXhu05rsejSVFQaHQIUhoW90gX1CF9pWS47C3qSnvAKjLE55UoZpjJ58z5r63EMGB6tyKMi1nRiW7_nH5WUhaNrAfN10Dec33KMiK64slPyHRQXIKXElW1Log710QVkGCZNoVcLqnfqmBVDBNa_VvpKyqY5yG-VWEmtqFNX_t_0M0SbVL6ZOWXSXo51xVvwM5cRCTbO3WfySPP93IXYsuXT_h1z6Fecm3IMII3ffhg8EUhvAPGUIbG9-kKLiRAczMGg3TpiLqxffRFznEWJPttLhZ30f38xPHas71J5UlCmD7gO_PLcdwKqZTJTZcGKg-mPR30",
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
