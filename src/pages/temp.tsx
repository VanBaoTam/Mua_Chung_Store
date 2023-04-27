// import axios from "axios";
// import { CodeModel } from "../models";

// async function handleCreateNew(newCode: CodeModel) {
//   await axios.post(
//     `45.77.157.98/api/create`,
//     {
//       dataSource: "MuaChung",
//       database: "test",
//       collection: "groupbuys",
//       document: {
//         idGroupBuy: newCode.groupBuyId,
//         orders: newCode.orders.subId,
//         createTime: newCode.createTime,
//         delayTime: newCode.delayTime,
//       },
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "api-key":
//           "HpiSqIvrTYzHMkTM6SSrRbxZv1yY1PaWj65mBcYw2moPFIh69SFruJOzQcIEZW2q",
//       },
//     }
//   );
//   console.log("CREATE NEW");
// }
