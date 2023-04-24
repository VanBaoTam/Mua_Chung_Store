import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAcceptRenderNavBar: true,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAcceptRenderNavBar: (state, action: PayloadAction<boolean>) => {
      state.isAcceptRenderNavBar = action.payload;
    },
  },
});
export const { setAcceptRenderNavBar } = appSlice.actions;
export default appSlice.reducer;
