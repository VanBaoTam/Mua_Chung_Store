import { CartProductModel } from "../models";

export const SumPrice = (OrderArr: CartProductModel[]): number => {
  let result = 0;
  OrderArr.forEach((Product) => {
    result += Product.price * Product.quantity;
  });
  return result;
};
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

  return final.split("").reverse().join("");
};

export const ConvertSalePrice = (price: number, amount: number): string => {
  let template = Math.ceil(price * amount) + "";
  let stringArray = Array.from(template);
  stringArray[stringArray.length - 1] = "0";
  let convertedPrice = stringArray.join("");
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
  return final.split("").reverse().join("");
};

export const ConvertShipmentFee = (fee: number): string => {
  let convertedPrice = fee + "";
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

  return final.split("").reverse().join("");
};

export const ConvertPriceAll = (
  OrderArr: CartProductModel[],
  ShipmentFee: number
): string => {
  let temp = ShipmentFee;
  OrderArr.forEach((Product) => {
    temp += Product.price * Product.quantity;
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

  return final.split("").reverse().join("");
};
