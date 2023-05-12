import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Input, Page, Radio, Select, Text } from "zmp-ui";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import OrderItem from "../components/Sheet/OrderItem";
import { ConvertPriceAll, ConvertShipmentFee, SumPrice } from "../utils/Prices";
import pay, { getOrderFromUser } from "../services/Order";
import { AddressFormType, CartProductModel, GHTKModel } from "../models";
import {
  Patched,
  createCode,
  patchUser,
  setInitPatched,
} from "../features/Code/CodeSlice";
import {
  ConvertArrToRecords,
  ConvertCartProductModelsToGHTK,
  ConvertCartProductModelsToOrderInfoModels,
} from "../utils/ConvertOrder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { clearCart, setOrderCode } from "../features/Order/OrderSlice";
import OrderSuccess from "../components/Sheet/OrderSucess";
import {
  HandleUpGetShipmentFee,
  HandleUploadNewShipMent,
} from "../services/Shipment";
import Loading from "../components/Modal/Loading";
import { getDistricts, getProvinces } from "../services/Location";
import { getWards } from "../services/Location";
import LoginRequired from "../components/Modal/LoginRequired";
import OrderFail from "../components/Sheet/OrderFail";
import PopUpModal from "../components/Modal/PopUpModal";
const { Option } = Select;
function uniqueId() {
  return "MC" + Math.random().toString(36).substring(2);
}
function uniqueGHTK() {
  return Math.random().toString(36).substring(10);
}
let today = new Date();
let uniqueGHTKVar = uniqueGHTK();
let initCode = uniqueId();
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((store) => store.orders);
  const userInfo = useAppSelector((store) => store.user);
  const codeSlice = useAppSelector((store) => store.codes);
  const OrderCode = useAppSelector((store) => store.orders.initCode);
  const previous = useAppSelector((store) => store.previous);
  const [pending, setPending] = useState(false);
  const [codeRequired, setCodeRequired] = useState<boolean>(false);
  const [phoneNumberFormat, setPhoneNumberFormat] = useState<boolean>(false);
  const [locationRequired, setlocationRequired] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [settedPayment, setSettedPayment] = useState<boolean>(false);
  const [isNewcodeCalled, setIsNewcodeCalled] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [fail, setFail] = useState<boolean>(false);
  const [Shipment, setShipment] = useState<boolean>(false);
  const [addressRequired, setAddressRequired] = useState<boolean>(false);
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [GBOver, setGBOver] = useState<boolean>(false);
  const [userExist, setUserExist] = useState<boolean>(false);

  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [code, setCode] = useState<string>(OrderCode);
  const [point, setPoint] = useState<number>(0);
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [ShipmentFee, setShipmentFee] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");

  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [Provinces, setProvinces] = useState<any>();
  const [Districts, setDistricts] = useState<any>();
  const [Wards, setWards] = useState<any>();
  const [currentProvince, setCurrentProvince] = useState<string>("");
  const [currentDistrict, setCurrentDistrict] = useState<string>("");
  const [currentWard, setCurrentWard] = useState<string>("");
  const [selectedDistrict, setselectedDistrict] = useState<string>("");
  const [selectedWard, setselectedWard] = useState<string>("");
  //
  useEffect(() => {
    if (previous.groupbuyId !== "") {
      setCode(previous.groupbuyId);
    }
    if (orders.initCode !== "") {
      setCode(orders.initCode);
    }
  }, []);

  //Set Adress
  useEffect(() => {
    (async () => {
      await handleGetProvinces();
      await handleGetDistricts(1);
      await handleGetWards(1);
    })();
  }, []);

  //Check is Logined
  useEffect(() => {
    if (!userInfo.userInfo.id) setIsLogined(true);
    else setIsLogined(false);
  }, [userInfo.userInfo.id]);

  //Refresh Load checking
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, [isLoaded]);

  //Create new Groupbuy
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
  useEffect(() => {
    if (OrderCode !== "" && OrderCode !== undefined && OrderCode !== null) {
      setCode(OrderCode);
    }
  }, [OrderCode]);
  //Check if patch success
  useEffect(() => {
    console.log(codeSlice.isPatched);
    if (codeSlice.isPatched == 4) {
      dispatch(Patched(4));
      setGBOver(true);
      setTimeout(() => {
        dispatch(setInitPatched());
        setGBOver(false);
      }, 3000);
    } else if (codeSlice.isPatched == 5) {
      dispatch(Patched(5));
      setUserExist(true);
      setTimeout(() => {
        dispatch(setInitPatched());
        setUserExist(false);
      }, 3000);
    } else if (codeSlice.isPatched == 3) {
      dispatch(Patched(3));
      setTimeout(() => {
        dispatch(setInitPatched());
        handleOrderFail();
      }, 1000);
    } else if (codeSlice.isPatched == 2) {
      dispatch(Patched(2));
      setTimeout(() => {
        dispatch(setInitPatched());
        handleOrderSuccess();
      }, 1000);
    }
  }, [codeSlice.isPatched]);

  //Address Funcs
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
          setselectedDistrict("-");
          setselectedWard("-");
          setPaymentMethod(null);
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
          setselectedWard("-");
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

  //HandleOrder
  async function handleOrderSuccess() {
    let total = SumPrice(orders.Products);
    let ghtkProducts = ConvertCartProductModelsToGHTK(orders.Products);
    let uniqueGHTKVar = uniqueGHTK();
    if (paymentMethod == "COD")
      await handleOrderOnGHTK(ghtkProducts, false, total, uniqueGHTKVar);
    else await handleOrderOnGHTK(ghtkProducts, true, total, uniqueGHTKVar);
    setIsLoaded(true);
    setOrderSuccess(true);
  }
  function handleOrderFail() {
    setFail(true);
    setTimeout(() => {
      setFail(false);
    }, 5000);
  }

  //Create new group buy
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
    if (userInfo.point <= 0) {
      setPoint(0);
    } else if (roundedValue >= 0 && roundedValue <= userInfo.point) {
      setPoint(roundedValue);
    } else setPoint(0);
  }

  function handleSignin() {
    navigate("/user");
  }
  async function handleShipmentFee(e) {
    const temp = await HandleUpGetShipmentFee(
      orders.Products,
      currentProvince,
      currentDistrict
    );
    setShipmentFee(temp);
    setShipment(true);
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
      userInfo.userInfo.name,
      phonenumber
    );
    console.log(resp);
  }
  const isEmpty = orders.Products.length == 0 ? true : false;
  const orderItems = orders.Products.map((ordersProduct: CartProductModel) => {
    return <OrderItem key={uniqueId()} {...ordersProduct} />;
  });
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
          <Box>
            {GBOver ? <PopUpModal title="Mã mua chung đã hết hạn!" /> : null}
            {userExist ? (
              <PopUpModal title="Người dùng đã tham gia mã!" />
            ) : null}
            {fail ? <OrderFail /> : null}
            {isLoaded ? null : <Loading />}
            {phoneNumberFormat ? (
              <PopUpModal title="Số điện thoại không chính xác!" />
            ) : null}
            {addressRequired ? (
              <PopUpModal title="Số nhà, tên đường không được để trống!" />
            ) : null}
            {codeRequired ? (
              <PopUpModal title="Mã mua chung không đúng cấu trúc!" />
            ) : null}
            {locationRequired ? (
              <PopUpModal title="Không được để trống các thanh chọn địa chỉ!" />
            ) : null}
            {settedPayment ? (
              <PopUpModal title="Phương thức thanh toán không được để trống!" />
            ) : null}
            {isLogined ? <LoginRequired handleSignin={handleSignin} /> : null}
            {orderSuccess ? (
              <OrderSuccess
                code={code}
                orderId={orderId}
                Delaydate={new Date(today.getTime() + 24 * 60 * 60 * 1000)}
                handleFinish={handleFinishOrder}
              />
            ) : null}
          </Box>
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
              <Button
                style={{ backgroundColor: "#f6bebe" }}
                disabled={pending ? true : false}
                onClick={NewCode}
              >
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
            <p className="text-red-400">Điểm: {userInfo.point} </p>
            <input
              type="number"
              min={0}
              placeholder="1.000 điểm = 1.000đ"
              max={userInfo.point <= 0 ? 0 : userInfo.point}
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
              value={phonenumber}
              placeholder="+84 ..."
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
                          defaultValue={"-"}
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
                          <Option key="" value="-" title="-" disabled={true} />
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
                if (
                  currentProvince == "" ||
                  currentDistrict == "" ||
                  currentWard == ""
                ) {
                  setPaymentMethod("");
                  setlocationRequired(true);
                  setTimeout(() => {
                    setlocationRequired(false);
                  }, 3000);
                } else {
                  setIsLoaded(false);
                  await handleShipmentFee(e);
                  setTimeout(() => {
                    setIsLoaded(true);
                  }, 1000);
                }
              }}
              value={paymentMethod}
              name={paymentMethod}
              className="text-black font-semibold flex flex-col"
            >
              <Box flex p={4} flexDirection="column">
                <Radio className="mt-2" name="COD" value="COD" label="COD" />
                {/* <Radio
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
                /> */}
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
            <span>{Shipment ? ConvertShipmentFee(ShipmentFee) : 0}đ</span>
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
            <span>{ConvertPriceAll(orders.Products, ShipmentFee)}đ</span>
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
            <Button
              style={{ backgroundColor: "#f6bebe" }}
              onClick={handleCreateOrder}
            >
              Thanh toán
            </Button>
          </Box>
          <div className="h-12"></div>
        </>
      )}
    </Page>
  );
  async function CreatingOrder(products, uniqueGHTKVar: string) {
    let total = SumPrice(orders.Products) + ShipmentFee,
      final = total - point;
    console.log(code);
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
    setOrderId(orderId);
    let payload = {
      code: code,
      orderId: orderId,
      userId: userInfo.userInfo.id,
      idByOA: userInfo.userInfo.idByOA,
      order: products,
      totalCost: total,
      discount: point,
      finalCost: final,
      address: address,
    };
    await dispatch(patchUser(payload));
  }
  async function handleCreateOrder() {
    //EXCEPTIONS
    let phoneflag = true;
    if (code.substring(0, 2) != "MC") {
      setCodeRequired(true);
      setTimeout(() => {
        setCodeRequired(false);
      }, 3000);
    } else {
      for (const char of phonenumber) {
        if (
          isNaN(parseInt(char)) ||
          (parseInt(char) <= 0 && parseInt(char) >= 9)
        ) {
          setPhoneNumberFormat(true);
          phoneflag = false;
          setTimeout(() => {
            setPhoneNumberFormat(false);
          }, 3000);
          break;
        }
      }
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
        setSettedPayment(true);
        setTimeout(() => {
          setSettedPayment(false);
        }, 3000);
      } else if (!userInfo.userInfo.id) {
        setIsLogined(true);
        setTimeout(() => {
          setIsLogined(false);
        }, 3000);
      } else {
        if (currentAddress != "" && currentAddress != null) {
          setIsLoaded(false);
          if (paymentMethod == "COD") {
            {
              let products = ConvertCartProductModelsToOrderInfoModels(
                orders.Products
              );

              await CreatingOrder(products, uniqueGHTKVar);
            }
          } else {
            {
              let products = ConvertCartProductModelsToOrderInfoModels(
                orders.Products
              );
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
