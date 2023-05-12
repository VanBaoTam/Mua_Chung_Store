import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductModel } from "../../models";

const initArr: ProductModel[] = [];
const initialState = {
  Products: initArr,
  isLoaded: false,
  access_token: "",
  page: 0,
};
export const getAccessToken = async () => {
  try {
    const access_token = await axios.get(`
  https://app.muachung.co/api/zalo/access_token`);
    return access_token.data;
  } catch (error) {}
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (offset: number, thunk) => {
    const states: any = thunk.getState();
    try {
      const resp = await axios.get(
        `https://openapi.zalo.me/v2.0/mstore/product/getproductofoa?offset=${offset}&limit=50`,
        {
          params: {
            offset: String(offset),
            limit: "50",
          },
          headers: {
            "Content-Type": "application/json",
            access_token: states.products.access_token,
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
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
  },
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
            id: item.id,
            code: item.code,
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            photo_links: item.photo_links,
          };
          state.Products = [...state.Products, product];
        });
        state.page += 10;
      }
    );
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoaded = false;
    });
  },
});
export const { setAccessToken } = productSlice.actions;
export default productSlice.reducer;
