export type ProductModel = {
  id: string;
  imgProduct: string;
  nameProduct: string;
  salePrice: number;
  description: string;
};
export type OrderModel = {
  id: string;
  imgProduct: string;
  nameProduct: string;
  salePrice: number;
  description: string;
  size: string;
  color: string;
  quantity: number;
};
export type CodeModel = {
  id: string;
  model: {
    id: string;
    subId: string[];
    createDate: Date;
    delayDate: Date;
  };
  amount: number;
};
