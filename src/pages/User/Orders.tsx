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
        {orders?.map((element) => {
          return (
            <Box
              mx={4}
              my={2}
              px={4}
              py={2}
              flex
              className=" bg-white rounded-lg  font-semibold"
              flexDirection="row"
              flexWrap
              justifyContent="space-around"
            >
              <Box flex flexDirection="column">
                {element.products.map((product) => {
                  // products.Products.find();
                  return <Text>{product.orderData.code}</Text>;
                })}
              </Box>
              <Box>
                <Text>{element.finalCost}</Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Page>
  );
};

export default UserOrders;
