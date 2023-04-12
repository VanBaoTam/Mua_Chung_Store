import { CartProductModel } from "../models";

export const totalPrice = (OrderArr: CartProductModel[]): number => {
  let result = 0;
  OrderArr.forEach((product) => {
    result += product.quantity * product.salePrice;
  });
  return result;
};
