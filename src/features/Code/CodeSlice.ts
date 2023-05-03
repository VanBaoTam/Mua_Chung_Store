import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CodeModel, OrderModel } from "../../models";

import axios from "axios";
let initCodeList: CodeModel[] = [];
const initialState = {
  code: initCodeList,
  isLoaded: false,
  isPatched: 1, //1 init , 2 success , 3 fail
};

// export const DeleteAll = createAsyncThunk("code/DeleteAll", async () => {
//   try {
//     await axios.post(
//       "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/deleteMany",
//       {
//         dataSource: "MuaChung",
//         database: "test",
//         collection: "groupbuys",
//         filter: {},
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "api-key":
//             "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
//         },
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// });

export const patchUser = createAsyncThunk(
  "code/patchUser",
  async (payload: any, thunk) => {
    try {
      const resp = await axios.patch(
        `https://app.muachung.co/api/groupbuy/${payload.code}/add/${payload.userId}`,
        {
          orderId: payload.orderId,
          userId: payload.userId,
          products: payload.order,
          totalCost: payload.totalCost,
          discount: payload.discount,
          finalCost: payload.totalCost,
          address: payload.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return resp;
    } catch (error) {
      console.log(error);
      return { code: "fail" };
    }
  }
);

async function handleCreateNew(newCode) {
  try {
    const resp = await axios.post(
      `https://app.muachung.co/api/groupbuy/create`,
      {
        idGroupBuy: newCode.groupBuyId,
        createTime: newCode.createTime,
        delayTime: newCode.delayTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
}

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    createCode: (state, { payload }) => {
      const today = new Date();
      const newCode = {
        amount: 1,
        groupBuyId: payload.code,
        orders: [
          {
            orderId: payload.code + payload.uniqueGHTKVar,
            userId: payload.user,
            products: payload.products,
            totalCost: payload.total,
            discount: 0,
            finalCost: payload.final,
            status: false,
            address: payload.address,
            paymentMethod: payload.paymentMethod,
            shipmentDate: payload.shipmentDate,
            deliveryTime: payload.deliveryTime,
          },
        ],
        createTime: today,
        delayTime: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      };
      handleCreateNew(newCode);
      //  paymentMethod: payload.paymentMethod,
    },
    initPatched: (state) => {
      state.isPatched = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(patchUser.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(patchUser.fulfilled, (state, resp) => {
      if ("code" in resp.payload) {
        console.log(resp);
        console.log("FAIL");
        state.isPatched = 3;
      } else {
        console.log("SUCCESS");
        console.log(resp);
        state.isPatched = 2;
      }
    });
    builder.addCase(patchUser.rejected, (state) => {
      state.isPatched = 3;
    });
  },
});
export const { createCode, initPatched } = codeSlice.actions;
export default codeSlice.reducer;
