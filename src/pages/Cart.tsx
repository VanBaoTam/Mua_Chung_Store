import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Input, Page, Radio, Select, Text } from "zmp-ui";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import OrderItem from "../components/OrderItem";
import { ConvertPriceAll, ConvertShipmentFee, SumPrice } from "../utils/Prices";
import pay from "../services/Order";
import { AddressFormType, CartProductModel, GHTKModel } from "../models";
import { createCode, patchUser } from "../features/Code/CodeSlice";
import {
  ConvertArrToRecords,
  ConvertCartProductModelsToGHTK,
  ConvertCartProductModelsToOrderInfoModels,
} from "../utils/ConvertOrder";
import AddressRequired from "../components/Modal/AddressRequired";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/Order/OrderSlice";
import OrderSuccess from "../components/Modal/OrderSucess";
import CodeRequired from "../components/Modal/CodeRequired";
import PaymentMethodRequired from "../components/Modal/PaymentMethodRequired";
import {
  HandleUpGetShipmentFee,
  HandleUploadNewShipMent,
} from "../services/Shipment";
import Loading from "../components/Modal/Loading";
import { getDistricts, getProvinces } from "../services/Location";
import { getWards } from "../services/Location";
import LocationRequired from "../components/Modal/LocationRequired";
import { number } from "prop-types";
import PhoneNumberFormat from "../components/Modal/PhoneNumberFormat";
import LoginRequired from "../components/Modal/LoginRequired";
const { Option } = Select;
function uniqueId() {
  return "MC" + Math.random().toString(36).substring(2);
}
function uniqueGHTK() {
  return Math.random().toString(36).substring(10);
}

let initCode = uniqueId();
const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders = useAppSelector((store) => store.orders);
  const userInfo = useAppSelector((store) => store.user);
  const [code, setCode] = useState<string>("");
  const [isNewcodeCalled, setIsNewcodeCalled] = useState<boolean>(false);
  const [pending, setPending] = useState(false);
  const [point, setPoint] = useState<number>(0);
  const [phonenumber, setPhonenumber] = useState<string>("");
  // const codeList = useAppSelector((store) => store.codes);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [ShipmentFee, setShipmentFee] = useState<number>(0);
  const [isGettedShipmentFee, setIsGettedShipmentFee] =
    useState<boolean>(false);
  const [codeRequired, setCodeRequired] = useState<boolean>(false);
  const [phoneNumberFormat, setPhoneNumberFormat] = useState<boolean>(false);
  const [locationRequired, setlocationRequired] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const [paymentMethod, setPaymentMethod] = useState<any>("");
  const [isSettedPaymentMethod, setIsSettedPaymentMethod] =
    useState<boolean>(false);
  const [addressRequired, setAddressRequired] = useState<boolean>(false);
  const [isLogined, setIsLogined] = useState<boolean>();
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [Provinces, setProvinces] = useState<any>();
  const [Districts, setDistricts] = useState<any>();
  const [Wards, setWards] = useState<any>();
  const [currentProvince, setCurrentProvince] = useState<string>("");
  const [currentDistrict, setCurrentDistrict] = useState<string>("");
  const [currentWard, setCurrentWard] = useState<string>("");
  const [selectedDistrict, setselectedDistrict] = useState<string>("");
  const [selectedWard, setselectedWard] = useState<string>("");
  const [shipmentDate, setShipmentDate] = useState<string>("");
  useEffect(() => {
    (async () => {
      await handleGetProvinces();
      await handleGetDistricts(1);
      await handleGetWards(1);
    })();
  }, []);
  useEffect(() => {
    if (Districts) {
      setselectedDistrict(Districts[0].code);
    }
  }, [Districts]);
  useEffect(() => {
    if (Wards) {
      setselectedWard(Wards[0].code);
    }
  }, [Wards]);
  useEffect(() => {
    if (!userInfo.userInfo.id) setIsLogined(true);
    else setIsLogined(false);
  }, [userInfo.userInfo.id]);
  useEffect(() => {
    if (isNewcodeCalled) {
      dispatch(
        createCode({
          code,
        })
      );
      setIsNewcodeCalled(false);
    }
  }, [isNewcodeCalled]);
  let today = new Date();
  const addressFormTypes: AddressFormType[] = [
    {
      name: "detail",
      label: "Số nhà, tên đường",
      type: "text",
      placeholder: "Nhập số nhà, tên đường ... ",
      isValidate: true,
    },
    {
      name: "province",
      label: "Tỉnh (Thành phố) ",
      type: "select",
      placeholder: "Chọn Tỉnh (Thành phố) ...  ",
      isValidate: true,
      selectedValue: currentProvince,
    },
    {
      name: "district",
      label: "Quận (Huyện)",
      type: "select",
      placeholder: "Select Quận (Huyện) ... ",
      isValidate: true,
      selectedValue: selectedDistrict,
      disabled: !currentProvince,
    },
    {
      name: "ward",
      label: "Phường (Xã)",
      type: "select",
      placeholder: "Select Phường (Xã) ...",
      isValidate: true,
      selectedValue: selectedWard,
      disabled: !currentDistrict,
    },
  ];
  async function handleGetProvinces() {
    getProvinces().then((resp) => {
      setProvinces(resp);
    });
  }
  async function handleGetDistricts(provinceId: number) {
    const districts = await getDistricts(provinceId);
    setDistricts(districts);
  }

  async function handleGetWards(DistrictId: number) {
    const wards = await getWards(DistrictId);
    setWards(wards);
  }
  function filterLocation(item: AddressFormType) {
    let listOptions;
    let value: string | undefined;
    let handleSelect;

    switch (item.name) {
      case "province":
        listOptions = Provinces;
        value = "";
        handleSelect = async (provinceId: number) => {
          const province = listOptions.find((option) => {
            return option.code === provinceId;
          });
          setCurrentProvince(province.name);
          setCurrentDistrict("");
          setCurrentWard("");
          value = currentProvince;
          await handleGetDistricts(provinceId);
        };
        break;
      case "district":
        listOptions = Districts;
        handleSelect = async (districtId: number) => {
          const district = listOptions.find((option) => {
            return option.code === districtId;
          });
          setCurrentDistrict(district.name);
          setselectedDistrict(district.code);
          setCurrentWard("");
          value = selectedDistrict;
          await handleGetWards(districtId);
        };
        break;
      case "ward":
        listOptions = Wards;
        handleSelect = async (wardId: number) => {
          const ward = listOptions.find((option) => {
            return option.code === wardId;
          });
          setCurrentWard(ward.name);
          setselectedWard(ward.code);
          value = selectedWard;
        };
        break;
      default:
        listOptions = Provinces;
        value = undefined;
        handleSelect = () => {};
        break;
    }
    return { value, listOptions, handleSelect };
  }
  function NewCode() {
    initCode = uniqueId();
    setPending(true);
    setCode(initCode);
    setIsNewcodeCalled(true);
    setTimeout(() => {
      setIsNewcodeCalled(false);
      setPending(false);
    }, 60000);
  }
  function handleInputChange(event) {
    setCode(event.target.value);
  }
  function handlePointChange(event) {
    const newValue = parseInt(event.target.value);
    const roundedValue = Math.ceil(newValue / 1000) * 1000; // Round the input to the nearest multiple of 1000
    if (roundedValue >= 0 && roundedValue <= 10000) {
      setPoint(roundedValue);
    }
    setPoint(0);
  }
  async function handleShipmentFee(e) {
    const temp = await HandleUpGetShipmentFee(
      orders.Products,
      currentProvince,
      currentDistrict
    );
    setShipmentFee(temp);
    setIsGettedShipmentFee(true);
    console.log("SHIPMENT FEE: " + temp);
    setPaymentMethod(e);
  }
  function handleFinishOrder() {
    setOrderSuccess(false);
    dispatch(clearCart());
    navigate("/");
  }
  function handlePhoneChange(e) {
    setPhonenumber(e.target.value);
  }
  async function handleOrderOnGHTK(
    GHTKOrders: GHTKModel[],
    isFreeship: boolean,
    totalCost: number,
    uniqueGHTKVar: string
  ) {
    const resp = await HandleUploadNewShipMent(
      GHTKOrders,
      currentAddress,
      currentProvince,
      currentDistrict,
      currentWard,
      isFreeship,
      totalCost,
      code,
      uniqueGHTKVar,
      ShipmentFee,
      userInfo.userInfo.name
    );
    console.log(resp);
    setShipmentDate(resp.order.estimated_deliver_time);
  }
  const isEmpty = orders.Products.length == 0 ? true : false;
  const orderItems = orders.Products.map((ordersProduct: CartProductModel) => {
    return <OrderItem key={uniqueId()} {...ordersProduct} />;
  });
  console.log(userInfo.userInfo.id);
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
          {isLoading ? <Loading /> : null}
          {phoneNumberFormat ? <PhoneNumberFormat /> : null}
          {addressRequired ? <AddressRequired /> : null}
          {codeRequired ? <CodeRequired /> : null}
          {locationRequired ? <LocationRequired /> : null}
          {isSettedPaymentMethod ? <PaymentMethodRequired /> : null}
          {isLogined ? <LoginRequired /> : null}
          {orderSuccess ? (
            <OrderSuccess
              code={code}
              Delaydate={new Date(today.getTime() + 24 * 60 * 60 * 1000)}
              amount={1}
              handleFinish={handleFinishOrder}
            />
          ) : null}
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
              <Button disabled={pending ? true : false} onClick={NewCode}>
                Tạo mã mới
              </Button>
            </div>
            <Text size="xxSmall" className="text-gray-500 text-center">
              Nút tạo mã cần 1 phút reset mỗi lần nhấn
            </Text>
            <Input
              helperText='Mã mua chung bắt đầu = "MC"'
              value={code}
              placeholder="Nhập mã mua chung"
              onChange={handleInputChange}
            ></Input>
          </Box>
          <Box
            mx={4}
            my={2}
            px={4}
            py={2}
            flex
            className="bg-white rounded-lg  font-semibold"
            flexDirection="column"
            flexWrap
          >
            <h4 className="text-black pb-2">Điểm chiết khấu</h4>
            <p className="text-red-400">Điểm: 10.000</p>
            <input
              type="number"
              min={0}
              placeholder="1.000 điểm = 1.000VNĐ"
              max={10000}
              onChange={handlePointChange}
              className="h-10 border-gray-100 border-2 rounded-2xl p-3 mt-2"
            ></input>
          </Box>
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
            <h4 className="text-black pb-4">Số điện thoại</h4>
            <Input
              helperText="Số điện thoại gồm 10 số và bắt đầu bằng số 0"
              value={phonenumber}
              placeholder="Nhập số điện thoại"
              onChange={handlePhoneChange}
            ></Input>
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
              {addressFormTypes.map((item: AddressFormType) => {
                const { value, listOptions, handleSelect } =
                  filterLocation(item);
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
                          disabled={item.disabled}
                          key={item.name}
                          id={item.name}
                          placeholder={item.placeholder}
                          closeOnSelect={true}
                          value={
                            item.name == "province"
                              ? value
                              : item.name == "district"
                              ? selectedDistrict
                              : item.name == "ward"
                              ? selectedWard
                              : value
                          } // Province , Dstrict , Wards
                          name={item.name}
                          onChange={(value) => handleSelect(value as number)}
                        >
                          {listOptions?.map((option) => (
                            <Option
                              key={option.code}
                              value={option.code}
                              title={option.name}
                            />
                          ))}
                        </Select>
                      ) : (
                        <Input
                          placeholder="Nhập số nhà, tên đường"
                          clearable
                          onChange={(event) =>
                            setCurrentAddress(event.target.value)
                          }
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
            flexDirection="column"
            className="bg-white rounded-lg text-red-400 font-semibold"
          >
            <Text
              size="large"
              bold
              className="text-black font-semibold border-b py-3 mb-0 w-full"
            >
              Phương thức thanh toán
            </Text>

            <Radio.Group
              onChange={async (e) => {
                if (currentProvince == "" || currentDistrict == " ") {
                  setlocationRequired(true);
                  setTimeout(() => {
                    setlocationRequired(false);
                  }, 3000);
                } else await handleShipmentFee(e);
              }}
              name={paymentMethod}
              className="text-black font-semibold flex flex-col"
            >
              <Box flex p={4} flexDirection="column">
                <Radio className="mt-2" name="COD" value={"COD"} label="COD" />
                <Radio
                  className="mt-2"
                  name="Momo"
                  value={"Momo"}
                  label="Momo"
                />
                <Radio
                  className="mt-2"
                  name="Zalo Pay"
                  value={"Zalo Pay"}
                  label="Zalo Pay"
                />
              </Box>
            </Radio.Group>
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
            <span>
              {isGettedShipmentFee ? ConvertShipmentFee(ShipmentFee) : 0}VNĐ
            </span>
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
            <span>{ConvertPriceAll(orders.Products, ShipmentFee)}VNĐ</span>
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
          <div className="h-12"></div>
        </>
      )}
    </Page>
  );
  async function CreatingOrder(products, uniqueGHTKVar: string) {
    let total = SumPrice(orders.Products),
      final = total;
    let address =
      "Địa chỉ: " +
      currentAddress +
      ", " +
      currentWard +
      ", " +
      currentDistrict +
      ", " +
      currentProvince;
    let orderId = code + uniqueGHTKVar;
    console.log("TESTING");
    console.log("CODE " + code);
    let payload = {
      code: code,
      orderId: orderId,
      userId: userInfo.userInfo.id,
      order: products,
      totalCost: total,
      discount: point,
      finalCost: final,
      status: false,
      address: address,
    };
    console.log("NEW CODE " + code);
    dispatch(patchUser(payload));
    console.log("ORDER IS SUCCESSED");
    setOrderSuccess(true);
  }
  async function handleCreateOrder() {
    //EXCEPTIONS
    let phoneflag = true;
    if (code.substring(0, 2) != "MC") {
      setCodeRequired(true);
      setTimeout(() => {
        setCodeRequired(false);
      }, 3000);
    } else if (phonenumber.length == 10 && parseInt(phonenumber[0]) == 0) {
      for (const char of phonenumber) {
        if (
          isNaN(parseInt(char)) ||
          (parseInt(char) <= 0 && parseInt(char) >= 9)
        ) {
          setPhoneNumberFormat(true);
          console.log("error phone");
          phoneflag = false;
          setTimeout(() => {
            console.log("reset phone");
            setPhoneNumberFormat(false);
          }, 3000);
          break;
        }
      }
    } else {
      setPhoneNumberFormat(true);
      console.log("error phone");
      phoneflag = false;
      setTimeout(() => {
        console.log("reset phone");
        setPhoneNumberFormat(false);
      }, 3000);
    }
    if (phoneflag) {
      if (currentAddress == "") {
        setAddressRequired(true);
        setTimeout(() => {
          setAddressRequired(false);
        }, 3000);
      } else if (
        currentProvince == "" ||
        currentDistrict == "" ||
        currentWard == ""
      ) {
        setlocationRequired(true);
        setTimeout(() => {
          setlocationRequired(false);
        }, 3000);
      } else if (paymentMethod == "") {
        setIsSettedPaymentMethod(true);
        setTimeout(() => {
          setIsSettedPaymentMethod(false);
        }, 3000);
      } else if (!userInfo.userInfo.id) {
        setIsLogined(true);
        setTimeout(() => {
          setIsLogined(false);
        }, 3000);
      } else {
        if (currentAddress != "" && currentAddress != null) {
          if (paymentMethod == "COD") {
            {
              let total = SumPrice(orders.Products);
              let products = ConvertCartProductModelsToOrderInfoModels(
                orders.Products
              );
              let ghtkProducts = ConvertCartProductModelsToGHTK(
                orders.Products
              );
              let uniqueGHTKVar = uniqueGHTK();
              await handleOrderOnGHTK(
                ghtkProducts,
                false,
                total,
                uniqueGHTKVar
              );
              await CreatingOrder(products, uniqueGHTKVar);
            }
          } else {
            {
              let total = SumPrice(orders.Products);
              let products = ConvertCartProductModelsToOrderInfoModels(
                orders.Products
              );
              let ghtkProducts = ConvertCartProductModelsToGHTK(
                orders.Products
              );
              let uniqueGHTKVar = uniqueGHTK();
              // await handleOrderOnGHTK(ghtkProducts, true, total, uniqueGHTKVar);
              pay(
                ShipmentFee + SumPrice(orders.Products),
                ConvertArrToRecords(products)
              )
                .then(async () => await CreatingOrder(products, uniqueGHTKVar))
                .catch((error) => console.log(error));
            }
          }
        }
      }
    }
  }
};

export default Cart;
