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
              "n9n4LIQBCGx1dK5U8uis0CIOGbyZa4yFYDraB6csVIltsM8B5eiHJx3k118p-74whQb55mdaHmkSfNWeESn8Tv6CU5TradjMbC5s3noH1IN_rIicOgCZ4EUq4J1gn3WEwx47C73G267EkWCwQCvrEyE-LXTay4GIvR5u2Xho4odmf2qlOEjRBShWLp1AbbCCmEfc3Lg6TWZn-LSJRRHBICQ_QaD2ysf3yxiLP4ta6KBwkZLJKjeLJB2DFt4acmXCeCzzLpcU5bs8oITW2gfOGPN1I5qigMjNZzLzM6shOs7GvsWxCwP4P8dPRsiXgX1XkzaRGIQQ9s-mr2f9KRiyTz8cHcaYb30F",
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
