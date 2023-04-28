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
  // https://app.muachung.co/api/order/createorder
  // https://cors-anywhere.herokuapp.com/https://services-staging.ghtklab.com/services/shipment/order
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

// try {
//   const response = await axios.post(
//     "https://services-staging.ghtklab.com/services/shipment/order",
//     {
//       userId: groupBuysId,
//       products: [
//         {
//           name: "b\xFAt",
//           weight: 0.1,
//           quantity: 1,
//           product_code: 1521,
//         },
//         {
//           name: "t\u1EA9y",
//           weight: 0.2,
//           quantity: 1,
//           product_code: 1254,
//         },
//       ],
//       order: {
//         //Ngữ cảnh: A gửi hàng cho GHTK để ship cho B
//         id: groupBuysId,
//         pick_name: "HCM-n\u1ED9i th\xE0nh", //Tên A
//         pick_address: "590 CMT8 P.11", // Địa chỉ A
//         pick_province: "TP. H\u1ED3 Ch\xED Minh",
//         pick_district: "Qu\u1EADn 3",
//         pick_tel: "0999999999", //Số A
//         tel: "0911222333", // Số B
//         name: "USERB", //Tên B
//         address: "123 nguy\u1EC5n ch\xED thanh", //Địa chỉ B
//         province: "TP. H\u1ED3 Ch\xED Minh",
//         district: "Qu\u1EADn 1",
//         ward: "Ph\u01B0\u1EDDng B\u1EBFn Ngh\xE9",
//         hamlet: "Kh\xE1c", //Địa chỉ cấp 4 (mặc định để khhác)
//         pick_money: ShipmentFee, //Tiền ship
//         value: 3000000, // Giá trị sản phẩm
//         pick_option: "cod", //Hình thức
//       },
//     },
//     {
//       headers: {
//         Token: "52259eC8d9e3C8CF7a4075aAF31107188924Cb44",
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   console.log(response);
// } catch (error) {
//   console.log(error);
// }
