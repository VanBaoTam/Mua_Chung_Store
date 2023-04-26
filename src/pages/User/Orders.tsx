import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Page, Text } from "zmp-ui";
import { handlegetOrdersFromUsers } from "../../services/User";
import { useAppSelector } from "../../hooks/hooks";
import Loading from "../../components/Modal/Loading";
const UserOrders = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const userInfo = useAppSelector((store) => store.user);
  const products = useAppSelector((store) => store.products);
  const userId = userInfo.userInfo.id;
  const EmptyOrders = (
    <Box pt={10} className="bg-white rounded-lg h-full text-center">
      <Icon icon="zi-minus-circle" />
      <Text size="xLarge">Bạn đang không có đơn hàng nào...</Text>
    </Box>
  );
  async function handleGetOrdersFromUser(userId) {
    const resp = await handlegetOrdersFromUsers(userId);
    console.log(resp);
    if (resp) {
      setOrders(resp);
      setIsLoaded(true);
    } else {
      setOrders(null);
      setIsLoaded(false);
    }
  }
  useEffect(() => {
    handleGetOrdersFromUser(userId);
  }, []);

  return (
    <Page hideScrollbar={true}>
      {orders ? null : EmptyOrders}
      {isLoaded ? null : <Loading />}
      <Box>
        {/* {orders?.map((element) => {
          let total = 0;
          return (
            <Box
              key={element._id}
              mx={4}
              my={2}
              px={4}
              py={2}
              className=" bg-white rounded-lg  font-semibold"
            >
              <Box
                py={2}
                flex
                justifyContent="space-evenly"
                className="font-semibold"
              >
                <Text>Mã </Text>
                <Text>Số lượng</Text>
                <Text>Giá thành</Text>
              </Box>
              <Box
                py={2}
                flex
                flexDirection="row"
                justifyContent="space-evenly"
              >
                {element.products.map((product) => {
                  total += product.orderData.quantity;
                  // products.Products.find();
                  return (
                    <>
                      <Text>{product.orderData.code}</Text>
                      <Text>{product.orderData.quantity}</Text>
                      <Text>
                        {product.orderData.quantity * product.orderData.price}
                      </Text>
                    </>
                  );
                })}
              </Box>
              <Box px={4} flex flexDirection="column">
                <Text bold>Tổng sản phẩm: {total}</Text>
                <Text bold>Tổng tiền: {element.finalCost}</Text>
              </Box>
            </Box>
          );
        })} */}
      </Box>
    </Page>
  );
};

export default UserOrders;
