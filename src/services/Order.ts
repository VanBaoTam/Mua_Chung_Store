import { Payment } from "zmp-sdk";
import appConfig from "../../app-config.json";
import { getShareableLink, openShareSheet } from "zmp-sdk/apis";
import axios from "axios";
// tạo yêu cầu thanh toán

const pay = (amount: number, products: Record<string, any>[]) =>
  new Promise((resolve, reject) => {
    Payment.createOrder({
      desc: `Thanh toán cho ${appConfig.app.title}`,
      item: products,
      amount: amount,
      success: (data) => {
        resolve(data);
      },
      fail: (err) => {
        console.log("err: ", err);
        reject(err);
      },
    });
  });

export default pay;

export const shareLinkGroupBuy = async (
  username: string,
  idGroupBuy: string,
  orderId: string,
  userId: string
) => {
  const res = await openShareSheet({
    type: "zmp",
    data: {
      title: "Cun Fashion",
      description: `Bạn vừa được ${username} gửi 1 lời mời tham gia. Mã mua chung của bạn là ${idGroupBuy}`,
      thumbnail:
        "https://w.ladicdn.com/s250x250/5cfe2dbab5f9462fe64cd2dd/chia-se-jpg-20230601114429-eqsbl.jpg",
      path: `/?idGroupBuy=${idGroupBuy}&orderId=${orderId}&userId=${userId}`,
    },
    fail: (err) => {
      console.log(err);
    },
  });
  return res.status;
};
export const getOrderFromUser = async (userId: string, orderId: string) => {
  try {
    const resp = await axios.get(
      `https://app.muachung.co/api/groupbuy/user/${userId}/${orderId}`
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
export const shareLinkTop = async (username: string, idGroupBuy: string) => {
  const userName = username !== "" ? username : "khách";
  const resp = await openShareSheet({
    type: "zmp",
    data: {
      title: "Cun Fashion",
      description: `Bạn vừa được ${userName} gửi 1 lời mời tham gia. Mã mua chung của bạn là ${idGroupBuy}`,
      thumbnail:
        "https://w.ladicdn.com/s250x250/5cfe2dbab5f9462fe64cd2dd/chia-se-jpg-20230601114429-eqsbl.jpg",
      path: `/?idGroupBuy=${idGroupBuy}`,
    },

    fail: (err) => {
      console.log(err);
      return -1;
    },
  });
  console.log(resp);
  return resp.status;
};
export const getAmountUser = async (idGroupBuy: string) => {
  try {
    const resp = await axios.get(
      `https://app.muachung.co/api/groupbuy/${idGroupBuy}`
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
