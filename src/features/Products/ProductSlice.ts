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
              "ni31VW33w4_2pi5z3CdiJCpAo7u2qRuTXu_HHHNpfpAvzVLwBAAV5v_djqKgvCWGZPcmHJp3pHMBgQHtBDlD0up3uYa_cTDX-vdy3KBfjstGYTqDGukdVk38bX5Kjk1quyoeNc6smdJ_uUrUEBsKBFtN_dexWOmGhl37LH6BkWgKx-1hJugP2-RTosLgchy8zvd4TbBkhG3JxSP_4g_tDBRRf4KeWiiMhksPQ6tfxJhIc9bvNklt9CI8d4e1ukC0nEB7Od28WoJk-Qz8A9JQ7O_6frKJkDTZaUcl3G3ksrAtc9O1DUNlQlI9n2vD_xr5xAdk1MlofbFrdjTYK_Or70S4s-v9",
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
