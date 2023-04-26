import { CartProductModel, GHTKModel, OrderInfoModel } from "../models";
export const ConvertCartProductModelsToOrderInfoModels = (
  OrderArr: CartProductModel[]
): OrderInfoModel[] => {
  let result: OrderInfoModel[] = [];
  let key = 0;
  OrderArr.forEach((item) => {
    let temp: OrderInfoModel = {
      orderId: key.toString(),
      orderData: {
        photo_link: item.photo_links,
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
export const ConvertCartProductModelsToGHTK = (
  OrderArr: CartProductModel[]
): GHTKModel[] => {
  let result: GHTKModel[] = [];
  OrderArr.forEach((item) => {
    let temp: GHTKModel = {
      name: item.name,
      weight: 0.2,
      product_code: item.code,
    };
    result.push(temp);
  });
  return result;
};
export const ConvertArrToRecords = (
  OrderArr: OrderInfoModel[]
): Record<string, any>[] => {
  let result: Record<string, any>[] = [];
  OrderArr.forEach((item) => {
    let temp: Record<string, any> = { id: item.orderId, info: item.orderData };
    result.push(temp);
  });
  return result;
};
