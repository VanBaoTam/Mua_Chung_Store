import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allItems: [],
  isloading: true,
};
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
});
