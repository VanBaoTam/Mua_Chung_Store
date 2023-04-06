import { OrderModel } from "../models";

export const ConvertPrice = (price: number, amount: number): string => {
  let convertedPrice = price * amount + "";
  let final: string = "";
  let index = 0;
  for (let i = convertedPrice.length - 1; i >= 0; i--) {
    if (index == 3) {
      final += ".";
      index = 0;
    }
    final += convertedPrice[i];
    index++;
  }

  return final.split("").reverse().join("") + ".000VNĐ";
};

export const ConvertPriceAll = (OrderArr: OrderModel[]): string => {
  let temp = 0;
  OrderArr.forEach((Product) => {
    temp += Product.salePrice * Product.quantity;
  });
  let convertedPrice = temp + "";
  let final: string = "";
  let index = 0;
  for (let i = convertedPrice.length - 1; i >= 0; i--) {
    if (index == 3) {
      final += ".";
      index = 0;
    }
    final += convertedPrice[i];
    index++;
  }

  return final.split("").reverse().join("") + ".000VNĐ";
};
