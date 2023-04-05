import React, { useState } from "react";
import { Box, Button, Input, Page, Select, Text } from "zmp-ui";
import { useAppSelector } from "../hooks/hooks";
import OrderItem from "../components/OrderItem";

const { Option } = Select;

function uniqueId() {
  return "id-" + Math.random().toString(36).substring(2, 16);
}

const newCode = <Input value={uniqueId()}></Input>;
const inputCode = <Input placeholder="Nhập mã mua chung"></Input>;

const Cart = () => {
  const [isShown, setShown] = useState(false);
  const orders = useAppSelector((store) => store.orders);
  const orderItems = orders.Products.map((ordersProduct) => {
    if (Number(ordersProduct.id) % 2 == 0)
      return <OrderItem key={ordersProduct.id} {...ordersProduct} />;
    return null;
  });

  return (
    <Page hideScrollbar={true}>
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
        <span>5.000.000VNĐ</span>
      </Box>
      <Box
        mx={4}
        mt={4}
        px={4}
        py={2}
        title="Địa chỉ giao hàng"
        className="rounded-lg bg-white"
      >
        <Box mt={3}>
          <Text bold>Địa chỉ giao hàng</Text>
          <Input
            label="Số nhà, tên đường"
            placeholder="Nhập địa chỉ nhà"
          ></Input>
        </Box>
        <Box mt={3}>
          <Select
            label="Tỉnh, Thành phố"
            placeholder="Placeholder"
            defaultValue="1"
            closeOnSelect={true}
          >
            <Option value="1" title="Tp.HCM" />
            <Option value="2" title="Hà Nội" />
            <Option value="3" title="Bình Định" />
            <Option value="4" title="Bến Tre" />
            <Option value="6" title="Tây Ninh" />
          </Select>
        </Box>
        <Box mt={3}>
          <Select
            label="Quận, Huyện"
            placeholder="Placeholder"
            defaultValue="1"
            closeOnSelect={true}
          >
            <Option value="1" title="Quận 1" />
            <Option value="2" title="Quận Tân Bình" />
            <Option value="3" title="Quận Bình Thạnh" />
            <Option value="4" title="Quận 8" />
          </Select>
        </Box>
        <Box mt={3}>
          <Select
            label="Phường, Xã"
            placeholder="Placeholder"
            defaultValue="1"
            closeOnSelect={true}
          >
            <Option value="1" title="Phường 1" />
            <Option value="2" title="Phường 2" />
            <Option value="3" title="Phường Phú Khương" />
            <Option value="4" title="Phường 4" />
          </Select>
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
        <span>30.000VNĐ</span>
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
        <Button>Thanh toán</Button>
      </Box>
      <Box mx={4} my={2} px={4} py={1}></Box>
    </Page>
  );
};

export default Cart;
// So nha ten duong
// tinh thanh pho
// quan huyen
// phuong xa
