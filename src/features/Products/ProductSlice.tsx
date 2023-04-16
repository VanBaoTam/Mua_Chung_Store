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
              "fa0RAqU8uKQbHHqbGetXIg166IH3bQGReXeY5XxLddlx4HXPGwwWS_O4944TWOqfZWuNIXEui6Ni02vRHCIJTDjl56fx-hu5-oer4KUZdNZw4WT4Ih--KUjqENn3xPrMl5u2I3xhcrw0GnzW5jo-OwiJF04GrvOMcs0DO7ZJg7RaNJ983_gDS8TV3MGlsA8FftGeFWFxZn6bN7aX4lFU5u5D9tKbvuLvnMf_HMAwnI_f0JaVP8olSV0K5rnwWPrpmWiyRsMfj5ZmEob8Uv2cVla-4LP9jkOqwGuQDKELaoB2AWetABYNF9C04WGKpfGnWcDZ3JdN_nkvGNbvEMpI_SvRG9FdGm",
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
