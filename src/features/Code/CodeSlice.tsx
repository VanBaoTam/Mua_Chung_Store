import { createSlice } from "@reduxjs/toolkit";
import { codeList } from "../../dummy/list-Code";
import { CodeModel } from "../../models";
const initialState = {
  code: codeList,
};
const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    createCode: (state, { payload }) => {
      const today = new Date();
      const newCode: CodeModel = {
        amount: 1,
        id: payload.code,
        model: {
          id: payload.code,
          subId: ["User's ID"],
          createDate: today,
          delayDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      };
      state.code.push(newCode);
      console.log(newCode);
    },
    addUser: (state, { payload }) => {
      const codeList = state.code.find((item) => item.id == payload.code)!;
      console.log(codeList);
      codeList.amount++;
      codeList.model.subId.push("New User's ID");
      console.log(codeList);
    },
  },
});
export const { createCode, addUser } = codeSlice.actions;
export default codeSlice.reducer;
