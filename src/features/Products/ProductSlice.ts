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
              "vJcRC38CYGxWE9uxDmoE0EKzdJet5zu4ldkLVcqfqaFzOBOiLrNzUVaVYG0cQ-5OXptt6onRhsUVCzOT0d-ROgmHzbWTOBDZaGRSF1mwiKYf3i0BAqQ2C_rrn5fh9OG1odFiR6yGjIlxGC1DH1oi19LUmaaNOhGqWWloR1zgloZFMD9gSJEIF-50uGj27fH_zsg37o43-sAASg0z9Xtk0R5R-pqbBx9cfbcY3pThjdcP1yCg4ZQz58TPrNCHQfOgfWF7RdHqq0Ya6u8n1bpiSOChemTIJBjypopR51fuZc-C6Sm7B7wXJueF-IqAM9TujGdxFG99W5-K0DXd43shBES48Gms4uWF",
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
