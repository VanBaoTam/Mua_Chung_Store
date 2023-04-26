import { Payment } from "zmp-sdk";
import appConfig from "../../app-config.json";
import { openShareSheet } from "zmp-sdk/apis";
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

export const shareLink = async () => {
  await openShareSheet({
    type: "zmp",
    data: {
      title: "Mua Chung Store - Lời mời tham gia Mã mua chung",
      description:
        "Bạn vừa được {Username của người Share} gửi 1 lời mời tham gia nhóm mã mua chung của Mua Chung Store để nhận được các mức chiết khấu ưu đãi. Mã mua chung của bạn là {MÃ MUA CHUNG}",
      thumbnail:
        "https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg",
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
