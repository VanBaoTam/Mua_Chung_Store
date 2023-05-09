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
  idGroupBuy: string
) => {
  await openShareSheet({
    type: "zmp",
    data: {
      title: "Lời mời tham gia mã mua chung",
      description: `Bạn vừa được ${username} gửi 1 lời mời tham gia. Mã mua chung của bạn là ${idGroupBuy}`,
      thumbnail:
        "https://w.ladicdn.com/s250x250/5cfe2dbab5f9462fe64cd2dd/m-logo-trong-cunfashion-shorst-3-20230209153455-nrh68.png",
      path: `/?idGroupBuy=${idGroupBuy}`,
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
// export const shareLinkGroupBuy = async (
//   username: string,
//   idGroupBuy: string
// ) => {
//   const link = await getShareableLink({
//     title: "Lời mời tham gia mã mua chung",
//     description: `Bạn vừa được ${username} gửi 1 lời mời tham gia. Mã mua chung của bạn là ${idGroupBuy}`,
//     thumbnail:
//       "https://w.ladicdn.com/s250x250/5cfe2dbab5f9462fe64cd2dd/m-logo-trong-cunfashion-shorst-3-20230209153455-nrh68.png",
//     path: "/",
//   });

//   await openShareSheet({
//     type: "link",
//     data: {
//       link,
//     },
//   });
// };

export const shareLinkTop = async (
  username: string,
  idGroupBuy: string,
  point: number
) => {
  await openShareSheet({
    type: "zmp",
    data: {
      title: "Lời mời tham gia mã mua chung",
      description: `Bạn vừa được ${username} gửi 1 lời mời tham gia. Mã mua chung của bạn là ${idGroupBuy}. Chiết khấu hiện tại là ${
        point * 100
      }%.`,
      thumbnail:
        "https://w.ladicdn.com/s250x250/5cfe2dbab5f9462fe64cd2dd/m-logo-trong-cunfashion-shorst-3-20230209153455-nrh68.png",
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
export const getAmountUser = async (idGroupBuy: string) => {
  try {
    const resp = await axios.get(
      `https://app.muachung.co/api/groupbuy/${idGroupBuy}`
    );
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
