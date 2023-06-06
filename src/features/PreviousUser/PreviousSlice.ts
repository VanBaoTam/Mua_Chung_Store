import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PreviousState {
  groupbuyId: string;
  userId: string;
  orderId: string;
  isShown: boolean;
  fromchatbot: number;
}
const initialState = {
  groupbuyId: "",
  userId: "",
  orderId: "",
  isShown: false,
  fromchatbot: 0, // 0: init, 1: from chatbot, 2: already paid
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
    setFromChatBot: (state, action: PayloadAction<number>) => {
      state.fromchatbot = action.payload;
    },
  },
});
export const {
  setInfo,
  setGroupbuyId,
  setUserId,
  setOrderId,
  setIsShown,
  setFromChatBot,
} = PreviousSlice.actions;
export default PreviousSlice.reducer;
