import { OrderModel } from "../models";

export const totalPrice = (OrderArr: OrderModel[]): number => {
  let result = 0;
  OrderArr.forEach((product) => {
    result += product.quantity * product.salePrice;
  });
  return result;
};
