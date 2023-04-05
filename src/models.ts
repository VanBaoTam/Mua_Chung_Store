export type ProductModel = {
  id: string;
  imgProduct: string;
  nameProduct: string;
  salePrice: number | string;
  retailPrice: number | string;
  description: string;
  type: string;
};
export type OrderModel = {
  id: string;
  imgProduct: string;
  nameProduct: string;
  salePrice: number | string;
  retailPrice: number | string;
  description: string;
  type: string;
  quantity: number;
};
