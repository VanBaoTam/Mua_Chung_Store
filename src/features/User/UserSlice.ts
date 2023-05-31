import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { userInfo } from "os";
import { getUserInfo } from "zmp-sdk";

interface userInfo {
  id: string;
  name: string;
  avatar: string;
  idByOA?: string | undefined;
}
const init: userInfo = {
  id: "",
  name: "iNiTiAl",
  avatar: "",
  idByOA: "",
};
const initialState = {
  userInfo: init,
  point: 0,
  isFollowed: false,
  isFirstTime: false,
};
export const handlegetUserInfo = createAsyncThunk(
  "user/handlegetUserInfo",
  async () => {
    try {
      const { userInfo } = await getUserInfo({});

      return userInfo;
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
      return init;
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Logout: (state) => {
      state.userInfo = init;
    },
    updatePoint: (state, product: PayloadAction<number>) => {
      state.point = product.payload;
    },
    setFollowed: (state, product: PayloadAction<boolean>) => {
      state.isFollowed = product.payload;
    },
    setFirstTime: (state, product: PayloadAction<boolean>) => {
      state.isFirstTime = product.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handlegetUserInfo.pending, (state) => {});
    builder.addCase(handlegetUserInfo.fulfilled, (state, actions) => {
      const userData = actions.payload;
      if (typeof userData !== "undefined") {
        // Use produce from immer to create a draft copy of the state
        // and update the userInfo property
        produce(state, (draftState) => {
          draftState.userInfo = userData;
          state.userInfo = userData;
        });
      }
    });
    builder.addCase(handlegetUserInfo.rejected, (state) => {});
  },
});
export const { Logout, updatePoint, setFollowed, setFirstTime } =
  userSlice.actions;
export default userSlice.reducer;
