import { createSlice } from "@reduxjs/toolkit";
import { codeList } from "../../dummy/list-Code";
const initialState = {
  code: codeList,
};
const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {},
});
export default codeSlice.reducer;
