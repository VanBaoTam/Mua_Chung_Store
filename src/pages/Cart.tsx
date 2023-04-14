import React, { useState } from "react";
import { Box, Button, Icon, Input, Page, Select, Text } from "zmp-ui";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import OrderItem from "../components/OrderItem";
import { ConvertPriceAll, SumPrice } from "../utils/Prices";
import locationVN from "../dummy/location";
import pay from "../apis/Order";
import { AddressFormType, CartProductModel, CodeModel } from "../models";
import AddressForm from "../dummy/address-form";
import { addUser, createCode } from "../features/Code/CodeSlice";
import {
  ConvertArrToRecords,
  ConvertCartProductModelsToOrderInfoModels,
} from "../utils/ConvertOrder";

const { Option } = Select;
function uniqueId() {
  return "id-" + Math.random().toString(36).substring(2, 16);
}
const initCode = uniqueId();
const Cart = () => {
  const [code, setCode] = useState<string>(initCode);
  const codeList = useAppSelector((store) => store.codes);
  const dispatch = useAppDispatch();
  const newCode = <Input value={initCode}></Input>;
  const inputCode = (
    <Input
      placeholder="Nhập mã mua chung"
      onChange={(e) => setCode(e.target.value)}
    ></Input>
  );

  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<any>(locationVN[0]);
  const [currentDistrict, setCurrentDistrict] = useState<any>(
    locationVN[0].districts[0]
  );
  const [currentWard, setCurrentWard] = useState<any>(
    locationVN[0].districts[0].wards[0]
  );

  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    locationVN[0].districts[0].id
  );
  const [selectedWardId, setSelectedWardId] = useState<string | null>(
    locationVN[0].districts[0].wards[0].id
  );

  const filterSelectionInput = (item: AddressFormType) => {
    let listOptions: any = locationVN;
    let value;
    let handleOnSelect: (id: string) => void;

    switch (item.name) {
      case "city":
        listOptions = locationVN;
        value = currentCity.id;
        handleOnSelect = (cityId) => {
          const indexCity = Number(cityId) - 1 > -1 ? Number(cityId) - 1 : 0;
          const firstDistrict = locationVN[indexCity].districts[0];
          const firstWard = firstDistrict.wards[0];
          setCurrentCity(locationVN[indexCity]);
          setCurrentDistrict(firstDistrict);
          setSelectedDistrictId(firstDistrict.id);
          setCurrentWard(firstWard);
          setSelectedWardId(firstWard.id);
        };
        break;
      case "district":
        listOptions = currentCity.districts;
        value = selectedDistrictId;

        handleOnSelect = (districtId) => {
          const district = currentCity.districts.find(
            (currentDistrict) => currentDistrict.id === districtId
          );
          const firstWard = district.wards[0];
          setCurrentDistrict(district);
          setSelectedDistrictId(districtId);
          setCurrentWard(firstWard);
          setSelectedWardId(firstWard.id);
        };
        break;
      case "ward":
        listOptions = currentDistrict.wards;
        value = selectedWardId;
        handleOnSelect = (wardId) => setSelectedWardId(wardId);
        break;
      default:
        listOptions = locationVN;
        value = undefined;
        handleOnSelect = () => {};
        break;
    }
    return { listOptions, value, handleOnSelect };
  };
  const [isShown, setShown] = useState(false);
  const orders = useAppSelector((store) => store.orders);

  const isEmpty = orders.Products.length == 0 ? true : false;
  const orderItems = orders.Products.map((ordersProduct: CartProductModel) => {
    return <OrderItem key={uniqueId()} {...ordersProduct} />;
  });

  const fee = 30;
  const description = "Thanh toán đơn hàng của USERNAME cho Mua Chung Store";

  const EmptyCart = (
    <Box pt={10} className="bg-white rounded-lg h-full text-center">
      <Icon icon="zi-minus-circle" />
      <Text size="xLarge">Giỏ hàng rỗng</Text>
    </Box>
  );
  return (
    <Page hideScrollbar={true}>
      {isEmpty ? (
        EmptyCart
      ) : (
        <>
          <Box title="Giỏ hàng">{orderItems}</Box>
          <Box
            mx={4}
            my={2}
            px={4}
            py={2}
            flex
            className="bg-white rounded-lg text-red-400 font-semibold"
            flexDirection="column"
            flexWrap
          >
            <h4 className="text-black pb-4">Mã mua chung</h4>
            <div className="flex justify-around pb-3">
              <Button onClick={() => setShown(true)}>Tạo mã mới</Button>
              <Button onClick={() => setShown(false)}>Nhập mã</Button>
            </div>
            {isShown ? newCode : inputCode}
          </Box>
          <Box
            mx={4}
            my={2}
            px={4}
            py={2}
            flex
            justifyContent="space-between"
            className="bg-white rounded-lg text-red-400 font-semibold"
          >
            <span>Tổng tiền</span>
            <span>{ConvertPriceAll(orders.Products)}VNĐ</span>
          </Box>
          <Box
            mx={4}
            mt={4}
            px={4}
            py={2}
            title="Địa chỉ giao hàng"
            className="rounded-lg bg-white"
          >
            <Box m={0} px={4} className=" bg-white">
              <Text size="large" bold className=" border-b py-3 mb-0">
                Địa chỉ giao hàng
              </Text>

              {AddressForm.map((item: AddressFormType) => {
                const { listOptions, value, handleOnSelect } =
                  filterSelectionInput(item);

                return (
                  <div key={item.name}>
                    <Text
                      size="large"
                      bold
                      className="after:content-['_*'] after:text-red-400 after:text-primary after:align-middle"
                    >
                      {item.label}
                    </Text>
                    <Box className="relative" m={0}>
                      {item.type === "select" ? (
                        <Select
                          // key={value}
                          id={item.name}
                          placeholder={item.placeholder}
                          name={item.name}
                          value={value}
                          closeOnSelect={true}
                          onChange={(value) => {
                            handleOnSelect(value as string);
                          }}
                        >
                          {listOptions?.map((option) => (
                            <Option
                              key={option.id}
                              value={option.id}
                              title={option.name}
                            />
                          ))}
                        </Select>
                      ) : (
                        <Input
                          placeholder="Nhập số nhà, tên đường"
                          clearable
                          onChange={(e) => setCurrentAddress(e.target.value)}
                        />
                      )}
                    </Box>
                  </div>
                );
              })}
            </Box>
          </Box>
          <Box
            mx={4}
            my={2}
            px={4}
            py={2}
            flex
            justifyContent="space-between"
            className="bg-white rounded-lg text-red-400 font-semibold"
          >
            <span>Phí ship</span>
            <span>{fee}.000VNĐ</span>
          </Box>
          <Box
            mx={4}
            my={2}
            px={4}
            py={3}
            flex
            justifyContent="center"
            className="bg-white rounded-lg text-red-400 font-semibold"
          >
            <Button onClick={handleCreateOrder}>Thanh toán</Button>
          </Box>
          <Box mx={4} my={2} px={4} py={1}></Box>{" "}
        </>
      )}
    </Page>
  );
  function CreatingOrder(products) {
    let total = SumPrice(orders.Products),
      final = total;
    let address =
      "Địa chỉ: " +
      currentAddress +
      ", " +
      currentWard.name +
      ", " +
      currentDistrict.name +
      ", " +
      currentCity.name;

    let tempCode: CodeModel | undefined = codeList.code.find((SameCode) => {
      return SameCode.id == code;
    });
    if (tempCode !== undefined && tempCode !== null) {
      if (tempCode.model.delayTime < new Date())
        console.log("Quá thời gian 24h của code");
      else dispatch(addUser({ code, products, total, final, address }));
    } else {
      dispatch(createCode({ initCode, products, total, final, address }));
    }
  }
  function handleCreateOrder() {
    let products = ConvertCartProductModelsToOrderInfoModels(orders.Products);
    pay(
      fee * 1000 + SumPrice(orders.Products),
      description,
      ConvertArrToRecords(products)
    )
      .then(() => CreatingOrder(products))
      .catch((error) => console.log(error));
  }
};

export default Cart;
