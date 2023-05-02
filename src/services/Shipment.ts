//GHTK APIS Config
import axios from "axios";
import { CartProductModel, GHTKModel } from "../models";
export async function HandleUploadNewShipMent(
  products: GHTKModel[],
  address: string,
  province: string,
  district: string,
  ward: string,
  is_freeship: boolean,
  value: number,
  groupBuysId: string,
  uniqueGHTK: string,
  ShipmentFee: number,
  username
) {
  const isFreeship: number = is_freeship ? 0 : 1;
  console.log(products);
  const resp = await fetch(" https://app.muachung.co/api/order/createorder", {
    method: "POST",
    body: JSON.stringify({
      products: products,
      order: {
        id: groupBuysId + uniqueGHTK,
        pick_name: "Cun Fashion shop", //Tên A
        pick_address: "590 CMT8 P.11", // Địa chỉ A
        pick_province: "TP. Hồ Chí Minh",
        pick_district: "Quận 3",
        pick_tel: "0999999999", //Số A
        tel: "0911222333", // Số B
        name: username, //Tên B
        address: address, //Địa chỉ B
        province: province,
        district: district,
        ward: ward,
        hamlet: "Khác", //Địa chỉ cấp 4 (mặc định để khhác)
        is_freeship: isFreeship,
        pick_money: ShipmentFee, //Tiền ship
        value: value, // Giá trị sản phẩm
        transport: "road",
      },
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await resp.json();
  return json;
}

export async function HandleUpGetShipmentFee(
  order: CartProductModel[],
  province: string,
  district: string
) {
  let weight = 0;
  order.forEach((product) => {
    weight += product.quantity * 0.2;
  });
  try {
    const response = await axios.get(
      "https://App.muachung.co/api/order/orderfee",
      {
        params: {
          pick_province: "Hồ Chí Minh",
          pick_district: "Quận 8",
          province: province,
          district: district,
          weight: weight,
          transport: "road",
          deliver_option: "none",
        },
      }
    );
    console.log(response);
    return response.data.fee.fee;
  } catch (error) {
    console.log(error);
  }
}
