import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Products/ProductSlice";
import orderReducer from "../features/Order/OrderSlice";
import codeReducer from "../features/Code/CodeSlice";
import appReducer from "../features/App/AppSlice";
import userReducer from "../features/User/UserSlice";
import previousReducer from "../features/PreviousUser/PreviousSlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
    codes: codeReducer,
    appFeatures: appReducer,
    user: userReducer,
    previous: previousReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
