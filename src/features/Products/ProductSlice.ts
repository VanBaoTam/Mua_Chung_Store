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
      const resp = await axios.get("https://app.muachung.co/api/product", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(resp.data);
      return resp.data;
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
          const product: ProductModel = {
            id: item[0],
            code: item[1],
            name: item[2],
            description: item[3],
            price: parseFloat(item[5]),
            photo_links: item[6],
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
