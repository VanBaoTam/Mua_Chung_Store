import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductModel } from "../../models";

const initArr: ProductModel[] = [];
const initialState = {
  Products: initArr,
  isLoaded: false,
  access_token: "",
  page: 0,
  loadedPages: [0],
  total: -1,
};
export const getAccessToken = async () => {
  try {
    const access_token = await axios.get(`
  https://app.muachung.co/api/zalo/access_token`);
    return access_token.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (offset: number, thunk) => {
    const states: any = thunk.getState();
    try {
      const resp = await axios.get(
        `https://openapi.zalo.me/v2.0/mstore/product/getproductofoa`,
        {
          params: {
            offset: String(offset),
            limit: "20",
          },
          headers: {
            "Content-Type": "application/json",
            access_token: states.products.access_token,
          },
        }
      );
      console.log(resp.data);
      return resp.data.data.products;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTotalProducts = createAsyncThunk(
  "products/getTotalProducts",
  async (offset: number, thunk) => {
    const states: any = thunk.getState();
    try {
      const resp = await axios.get(
        `https://openapi.zalo.me/v2.0/mstore/product/getproductofoa`,
        {
          params: {
            offset: String(offset),
            limit: "20",
          },
          headers: {
            "Content-Type": "application/json",
            access_token: states.products.access_token,
          },
        }
      );
      return resp.data.data.total;
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
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      if (state.loadedPages.includes(action.payload)) return;
      state.loadedPages = [...state.loadedPages, action.payload];
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
            sales: item.sales,
          };
          state.Products = [...state.Products, product];
        });
      }
    );
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getTotalProducts.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(
      getTotalProducts.fulfilled,
      (state, products: PayloadAction<number>) => {
        state.total = products.payload;
        state.isLoaded = true;
      }
    );
    builder.addCase(getTotalProducts.rejected, (state) => {
      state.isLoaded = false;
    });
  },
});
export const { setAccessToken, setPage } = productSlice.actions;
export default productSlice.reducer;
