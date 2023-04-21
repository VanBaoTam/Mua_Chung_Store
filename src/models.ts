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
  //Zalo User's id
  userId: string;
  //Đơn hàng của user
  products: OrderInfoModel[];
  //Tổng tiền
  totalCost: number;
  //Giảm gía
  discount: number;
  //Thực trả
  finalCost: number;
  address: string;
  paymentMethod: string;
  //Tình trạng (true = đã thanh toán| false = chưa thanh toán)
  status: boolean;
};
export type CodeModel = {
  //Mã mua chung
  groupBuyId: string;
  orders: {
    //mã mua chung (dùng để nhận dạng đơn hàng của các user thuộc về mã mua chung nào)
    groupBuyId: string;
    //List các user tham gia mã mua chung, subId[0] = người tạo.
    subId: OrderModel[];
  };
  //Ngày khởi tạo mã mua chung
  createTime: Date;
  //Ngày kết thúc mã mua chung (default = 1 ngày sau ngày createDate
  // delay = createDate's miliseconds + 86,400,000)
  delayTime: Date;
  amount: number;
};

export type AddressFormType = {
  name: "detail" | "province" | "district" | "ward";
  label: string;
  type: "text" | "select";
  placeholder: string;
  isValidate: boolean;
  errorMessage?: string;
  selectedValue?: string;
  disabled?: boolean;
};

export type DBOrder = {
  //Đơn hàng: <string,any> = id sp, thông tin sản phẩm (mã,số lượng,giá tiền)
  Products: Record<string, any>[];
  //Địa chỉ
  address: string;
  //Tổng tiền thanh toán
  cost: number;
};
