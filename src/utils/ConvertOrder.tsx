import { CartProductModel, OrderInfoModel } from "../models";
export const ConvertCartProductModelsToOrderInfoModels = (
  OrderArr: CartProductModel[]
): OrderInfoModel[] => {
  let result: OrderInfoModel[] = [];
  let key = 0;
  OrderArr.forEach((item) => {
    let temp: OrderInfoModel = {
      key: key.toString(),
      info: {
        code: item.code,
        quantity: item.quantity,
        price: item.price,
      },
    };
    result.push(temp);
    key++;
  });
  return result;
};
export const ConvertArrToRecords = (
  OrderArr: OrderInfoModel[]
): Record<string, any>[] => {
  let result: Record<string, any>[] = [];
  OrderArr.forEach((item) => {
    let temp: Record<string, any> = { id: item.key, info: item.info };
    console.log(temp);
    result.push(temp);
  });
  return result;
};
