import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Products/Product";
import orderReducer from "../features/Order/OrderSlice";
import codeReducer from "../features/Code/CodeSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
    codes: codeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
