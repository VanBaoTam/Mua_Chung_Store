import { Payment } from "zmp-sdk";
import appConfig from "../../app-config.json";
import { OrderModel } from "../models";
import { useAppSelector } from "../hooks/hooks";
// tạo yêu cầu thanh toán

const pay = (amount: number, description?: string, order?: OrderModel) =>
  new Promise((resolve, reject) => {
    Payment.createOrder({
      desc: description ?? `Thanh toán cho ${appConfig.app.title}`,
      item: [],
      amount: amount,
      success: (data) => {
        console.log("success: ", data);
        resolve(data);
      },
      fail: (err) => {
        console.log("err: ", err);
        reject(err);
      },
    });
  });
export default pay;
