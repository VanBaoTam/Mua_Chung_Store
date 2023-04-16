import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { CodeModel } from "../../models";
import { getUser } from "../../apis/User";
import axios from "axios";
let codeList: CodeModel[] = [];
const initialState = {
  code: codeList,
  isLoaded: false,
};
let User = await getUser();
export const DeleteAll = createAsyncThunk("code/DeleteAll", async () => {
  try {
    await axios.post(
      "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/deleteMany",
      {
        dataSource: "MuaChung",
        database: "test",
        collection: "groupbuys",
        filter: {},
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
});
async function handleAddUser(code: CodeModel) {
  await axios.post(
    "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/updateOne",
    {
      dataSource: "MuaChung",
      database: "test",
      collection: "groupbuys",
      filter: {
        id: code,
      },
      update: {
        $set: {
          amount: code.amount,
          orders: code.orders,
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
      },
    }
  );
}
async function handleCreateNew(newCode: CodeModel) {
  await axios.post(
    "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/insertOne",
    {
      dataSource: "MuaChung",
      database: "test",
      collection: "groupbuys",
      document: {
        id: newCode.id,
        orders: newCode.orders.subId,
        createTime: newCode.createTime,
        delayTime: newCode.delayTime,
        amount: newCode.amount,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
      },
    }
  );
}

async function handleCreateNewOrders(newCode: CodeModel) {
  await axios.post(
    "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/insertOne",
    {
      dataSource: "MuaChung",
      database: "test",
      collection: "Orders",
      document: {
        orders: newCode.orders,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
      },
    }
  );
}
export const getCodes = createAsyncThunk("code/getCodes", async () => {
  try {
    const resp = await axios.post(
      "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/find",
      // '{\n      "dataSource": "MuaChung",\n      "database": "test",\n      "collection": "groupbuys",\n      "filter": {}\n  }',
      {
        dataSource: "MuaChung",
        database: "test",
        collection: "groupbuys",
        filter: {},
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
        },
      }
    );
    resp.data.documents.forEach((item) => {
      const tempo: CodeModel = {
        id: item.id,
        orders: item.orders,
        createTime: item.createTime,
        delayTime: item.delayTime,
        amount: item.amount,
      };
      codeList = [...codeList, tempo];
      console.log(codeList);
    });
  } catch (error) {
    console.log(error);
  }
});

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    createCode: (state, { payload }) => {
      const today = new Date();
      const newCode: CodeModel = {
        amount: 1,
        id: payload.initCode,
        orders: {
          id: payload.initCode,
          subId: [
            {
              user: User,
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
      handleCreateNewOrders(newCode);
    },
    addUser: (state, { payload }) => {
      const code = state.code.find((item) => item.id == payload.code)!;
      code.amount++;
      console.log("CURRENT" + current(code));
      code.orders.subId = [
        ...code.orders.subId,
        {
          user: payload.id,
          products: payload.products,
          totalCost: payload.total,
          discount: 0,
          finalCost: payload.final,
          status: false,
          address: payload.address,
          paymentMethod: payload.paymentMethod,
        },
      ];
      console.log(code.orders.subId);
      handleAddUser(code);
      handleCreateNewOrders(code);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCodes.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getCodes.fulfilled, (state) => {
      state.isLoaded = true;
      state.code = codeList;
    });
    builder.addCase(getCodes.rejected, (state) => {
      state.isLoaded = false;
    });
  },
});
export const { createCode, addUser } = codeSlice.actions;
export default codeSlice.reducer;
