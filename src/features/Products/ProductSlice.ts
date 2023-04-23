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
              "qvf74HXoptRMcq8Q7NB8UDEUGHiTQROueUTL7187loJOabCeL2Md2PQpJ1TRACSfuxGr3NuLpM3yhHn4OaBq9l_mDq5RQiKcqjjDE6TLpYx4tamrKJ73DVcP3m9xB_iriBuNAXegw4cFb6foDIM7KVgjSZSmElWofOaoKpG0l7Jwbc1LNdReMT3h6rO619L2gOaPK2GQu72Gy2fN3doYDepsRLCVI9LSizncQ05hbd-s-LjF7LBPAQpv64uQ5_Hha_iRLJ4HvL64-X5dJb7PIzEy4qjACfj7xgLGS5CEasZdvMTvNWdkLko454ykCiHUuOWoU2m1p1-SZZykG_lPkrKSRSvt",
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
