export type ProductModel = {
  id: string;
  code: string;
  photo_links: string;
  name: string;
  price: number;
  description: string;
};

export type CartProductModel = {
  code: string;
  photo_links: string;
  name: string;
  price: number;
  description: string;
  size: string;
  color: string;
  quantity: number;
};
export type OrderInfoModel = {
  key: string;
  info: {
    code: string;
    quantity: number;
    price: number;
  };
};
export type OrderModel = {
  user: string;
  products: OrderInfoModel[];
  totalCost: number;
  discount: number;
  finalCost: number;
  status: boolean;
};
export type CodeModel = {
  id: string;
  model: {
    id: string;
    subId: OrderModel[];
    createDate: Date;
    delayDate: Date;
  };
  amount: number;
};

export type AddressFormType = {
  name: "detail" | "city" | "district" | "ward";
  label: string;
  type: "text" | "select";
  placeholder: string;
  isValidate: boolean;
  errorMessage?: string;
};
