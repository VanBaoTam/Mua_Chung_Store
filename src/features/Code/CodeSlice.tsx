import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CodeModel } from "../../models";
import { getUser } from "../../apis/User";
import axios from "axios";
const codeList: CodeModel[] = [];
let codeTemp: CodeModel = {
  id: "",
  orders: {
    id: "",
    subId: [],
    createTime: new Date(),
    delayTime: new Date(),
  },
  amount: 0,
};
const initialState = {
  code: codeList,
  isLoaded: false,
};
let User = await getUser();
export const DeleteAll = createAsyncThunk(
  "code/DeleteAll",
  async (name, thunk) => {
    try {
      await axios.post(
        "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/deleteMany",
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
              "jopHw9msuJVNtAoYgYcgx6rZyvzARugm6hgsJNysCQilqjIOnzEOd4vZ2SqZki4H",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);
async function handleCreateNew() {
  const CreateNew = await axios.post(
    "https://cors-anywhere.herokuapp.com/https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wfuog/endpoint/data/v1/action/insertOne",
    // '{\n      "dataSource": "Cluster0",\n      "database": "todo",\n      "collection": "tasks",\n      "document": {\n        "status": "open",\n        "text": "Do the dishes"\n      }\n  }',
    {
      dataSource: "MuaChung",
      database: "test",
      collection: "groupbuys",
      document: {
        id: codeTemp.id,
        orders: codeTemp.orders.subId,
        createTime: codeTemp.orders.createTime,
        delayTime: codeTemp.orders.delayTime,
        amount: codeTemp.amount,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "jopHw9msuJVNtAoYgYcgx6rZyvzARugm6hgsJNysCQilqjIOnzEOd4vZ2SqZki4H",
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
          "Content-Type": "application/ejson",
          "api-key":
            "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
        },
      }
    );
    console.log(resp);
    return resp.data.document;
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
            },
          ],
          createTime: today,
          delayTime: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      };
      codeTemp = newCode;
      handleCreateNew();
    },
    addUser: (state, { payload }) => {
      const codeList = state.code.find((item) => item.id == payload.code)!;
      codeList.amount++;
      codeList.orders.subId.push({
        user: payload.id,
        products: payload.products,
        totalCost: payload.total,
        discount: 0,
        finalCost: payload.final,
        status: false,
        address: payload.address,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCodes.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getCodes.fulfilled, (state, codes) => {
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
