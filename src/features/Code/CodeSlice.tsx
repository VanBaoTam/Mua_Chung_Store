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
          subId: [
            {
              user: "1111111111111111111",
              products: [],
              totalCost: 0,
              discount: 0,
              finalCost: 0,
              status: false,
            },
          ],
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
      codeList.model.subId.push({
        user: "1111111111111111111",
        products: [],
        totalCost: 0,
        discount: 0,
        finalCost: 0,
        status: false,
      });
      console.log(codeList);
    },
  },
});
export const { createCode, addUser } = codeSlice.actions;
export default codeSlice.reducer;
