import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { CodeModel, OrderModel } from "../../models";

import axios from "axios";
let initCodeList: CodeModel[] = [];
const initialState = {
  code: initCodeList,
  isLoaded: false,
};

// export const DeleteAll = createAsyncThunk("code/DeleteAll", async () => {
//   try {
//     await axios.post(
//       // https://cors-anywhere.herokuapp.com/
//       "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/deleteMany",
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
// {
//   dataSource: "MuaChung",
//   database: "test",
//   collection: "groupbuys",
//   idGroupBuy: newCode.groupBuyId,
//   orders: newCode.orders.subId,
//   createTime: newCode.createTime,
//   delayTime: newCode.delayTime,
// },
// {
//   headers: {
//     "Content-Type": "application/json",
//   },
// }
async function handleCreateNew(newCode: CodeModel) {
  console.log("CREATE NEW ORDERS");
  try {
    const resp = await axios.post(
      `https://app.muachung.co/api/groupbuy/create`,
      {
        idGroupBuy: newCode.groupBuyId,
        orders: newCode.orders,
        createTime: newCode.createTime,
        delayTime: newCode.delayTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("CREATE NEW SUCCESS");
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
}

async function handleCreateNewOrders(idGroupBuy: string, orders: OrderModel) {
  await axios.post(
    `https://App.muachung.co/api/groupbuy/create`,
    {
      userId: orders.userId,
      products: orders.products,
      totalCost: orders.totalCost,
      discount: orders.discount,
      finalCost: orders.finalCost,
      status: orders.status,
      address: orders.address,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("CREATE NEW ORDERS");
}
// export const getCodes = createAsyncThunk("code/getCodes", async () => {
//   try {
//     const resp = await axios.post(
//       "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/find",
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
//     resp.data.documents.forEach((item) => {
//       const tempo: CodeModel = {
//         id: item.id,
//         orders: item.orders,
//         createTime: item.createTime,
//         delayTime: item.delayTime,
//         amount: item.amount,
//       };
//       codeList = [...codeList, tempo];
//     });
//     console.log(codeList);
//   } catch (error) {
//     console.log(error);
//   }
// });

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    createCode: (state, { payload }) => {
      const today = new Date();
      const newCode: CodeModel = {
        amount: 1,
        groupBuyId: payload.code,
        orders: {
          groupBuyId: payload.code,
          subId: [
            {
              userId: payload.user,
              products: payload.products,
              totalCost: payload.total,
              discount: 0,
              finalCost: payload.final,
              status: false,
              address: payload.address,
              paymentMethod: payload.paymentMethod,
            },
          ],
        },
        createTime: today,
        delayTime: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      };
      handleCreateNew(newCode);
      // handleCreateNewOrders({
      //   userId: payload.user,
      //   products: payload.products,
      //   totalCost: payload.total,
      //   discount: 0,
      //   finalCost: payload.final,
      //   status: false,
      //   address: payload.address,
      //   paymentMethod: payload.paymentMethod,
      // });
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getCodes.pending, (state) => {
  //     state.isLoaded = false;
  //   });
  //   builder.addCase(getCodes.fulfilled, (state) => {
  //     console.log("FULLFILLED");
  //     state.isLoaded = true;
  //   });
  //   builder.addCase(getCodes.rejected, (state) => {
  //     state.isLoaded = false;
  //   });
  // },
});
export const { createCode } = codeSlice.actions;
export default codeSlice.reducer;
