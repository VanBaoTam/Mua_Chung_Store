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
<<<<<<< HEAD
              "QjCnVoux9oDkrJT-BJicBshLDdGl96TxAf4-9niyHpy-gmSqFHPs2JskOGqfI0yw3T9QAZ5683SmusjlCtyzJ0dCU7mhV6X73j5z5mu_RJaGkZeE6Yfh956x9NuLNN1H4SiwNJrzMbyNu4uELb0_D6g-PcKiAIrCBQ5aQ1nD7arOfMfH7H04V0QTTbOW3mHgDUHCHW9j0s4vWGrh6ofPOWU52qq-EnX2FODrQoe-748ebbGR6dq01YFwSbW6PnPf1-vcJZPk9XGtor0FDN0L7XITS4G9SM4V5fOm7o8kK0CIkJSw5GTd70EzS1KTKJOR3Dui52zIP30-tJyBGs9ptoDeBI8W9G",
=======
              "rn1k6CYVV0xJ7cuRn9Lu3TqQPnZAZHC0a5vI4DEA8rFC1cmaY-v-Gf4W42lmwm5YlGXADk3M8L3x5c8-dTO4HCiQMXVNuKr0o0ej4z3wMqgtBmizeTTkQkW5F0EAzYyMo11mMxNP0JhMLXPhlu5tPgLeCJB6Y5rrZ7q2PDkJSI2dN0ummfGPHTrCQmZ4WtLHdLOrDegrLrIHRGKGy8qL0wfjLnJVX4XYaMuj6ysjIGAkN01ozOeJEunTO46HZImN_K1_6hUH7rtDVarDh_uQ0xW3MLhlxZyuimLITV_rAY3eVcfKawaVJEuZG2Ujo0feu24KAe7BPdYNFIneOLylkISWp8Tw20",
>>>>>>> 3ce80639fcc4df0b0d4535e89ae57036478b690d
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
