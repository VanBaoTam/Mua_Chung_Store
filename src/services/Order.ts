import { Payment } from "zmp-sdk";
import appConfig from "../../app-config.json";
import { openShareSheet } from "zmp-sdk/apis";
import axios from "axios";
// tạo yêu cầu thanh toán

const pay = (amount: number, products: Record<string, any>[]) =>
  new Promise((resolve, reject) => {
    Payment.createOrder({
      desc: `Thanh toán cho ${appConfig.app.title}`,
      item: products,
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

export const shareLink = async (username: string, idGroupBuy: string) => {
  await openShareSheet({
    type: "zmp",
    data: {
      title: "Lời mời tham gia mã mua chung",
      description: `Bạn vừa được ${username} gửi 1 lời mời tham gia. Mã mua chung của bạn là ${idGroupBuy}`,
      thumbnail:
        "https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg",
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
export const getAmount = async (idGroupBuy) => {
  try {
    const resp = await axios.get(
      `https:app.muachung.co/api/groupbuy/${idGroupBuy}`,
      {
        params: {},
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
