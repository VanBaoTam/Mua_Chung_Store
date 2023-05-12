import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PreviousState {
  groupbuyId: string;
  userId: string;
  orderId: string;
  isShown: boolean;
}
const initialState = {
  groupbuyId: "",
  userId: "",
  orderId: "",
  isShown: false,
};

const PreviousSlice = createSlice({
  name: "previous",
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<PreviousState>) => {
      state.groupbuyId = action.payload.groupbuyId;
      state.userId = action.payload.userId;
      state.orderId = action.payload.orderId;
      state.isShown = action.payload.isShown;
    },
    setGroupbuyId: (state, action: PayloadAction<string>) => {
      state.groupbuyId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    setIsShown: (state) => {
      state.isShown = true;
    },
  },
});
export const { setInfo, setGroupbuyId, setUserId, setOrderId, setIsShown } =
  PreviousSlice.actions;
export default PreviousSlice.reducer;
