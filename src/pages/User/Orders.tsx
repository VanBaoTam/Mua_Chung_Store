import React, { useEffect, useState } from "react";
import { Box, Icon, Page, Text } from "zmp-ui";
import { handlegetOrdersFromUsers } from "../../services/User";
import { useAppSelector } from "../../hooks/hooks";
import Loading from "../../components/Modal/Loading";

import { useNavigate } from "react-router-dom";
const UserOrders = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const navigate = useNavigate();
  const userInfo = useAppSelector((store) => store.user);
  const userId = userInfo.userInfo.id;
  const EmptyOrders = (
    <Box pt={10} className="bg-white rounded-lg h-full text-center">
      <Icon icon="zi-minus-circle" />
      <Text size="xLarge">Bạn đang không có đơn hàng nào...</Text>
    </Box>
  );
  function handleCheckORderDetail(element) {
    navigate("/order-detail", { replace: true, state: { props: element } });
  }
  async function handleGetOrdersFromUser(userId) {
    const resp = await handlegetOrdersFromUsers(userId);
    console.log(resp);
    if (resp || resp.length != 0) {
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
          let total = 0;
          return (
            <Box
              key={element._id}
              mx={4}
              my={2}
              px={4}
              py={2}
              className=" bg-white rounded-lg  font-semibold"
              onClick={() => {
                handleCheckORderDetail(element);
              }}
            >
              <Box flex justifyContent="space-between">
                <Box flex flexDirection="column">
                  <Text bold>Mã đơn hàng của bạn</Text>
                  <Text>{element.orderId}</Text>
                </Box>
                <Box flex flexDirection="column" width={80}>
                  <Text bold>Trạng thái</Text>
                  <Text>
                    {element.status == "pending"
                      ? "Đang xử lý"
                      : element.status == "success"
                      ? "Hoàn thành"
                      : "Thất bại"}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Page>
  );
};

export default UserOrders;
