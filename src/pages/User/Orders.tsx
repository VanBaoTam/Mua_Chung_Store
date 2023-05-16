import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Page, Text } from "zmp-ui";
import { handlegetOrdersFromUsers } from "../../services/User";
import { useAppSelector } from "../../hooks/hooks";
import Loading from "../../components/Modal/Loading";
import { useNavigate } from "react-router-dom";
const UserOrders = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const userInfo = useAppSelector((store) => store.user);
  const userId = userInfo.userInfo.id;
  const EmptyOrders = (
    <Box pt={10} className="bg-white rounded-lg h-full text-center">
      <Icon icon="zi-minus-circle" />
      <Text size="xLarge">Bạn đang không có đơn hàng nào...</Text>
    </Box>
  );
  async function handleGetOrdersFromUser(userId) {
    const resp = await handlegetOrdersFromUsers(userId);

    if (!isNaN(resp.length) && resp.length > 0) {
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
          console.log(element);
          return (
            <Box
              key={element._id}
              mx={4}
              my={2}
              px={4}
              py={2}
              className=" bg-white rounded-lg  font-semibold"
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
              <Box textAlign="center" width={310} py={3}>
                <Button
                  fullWidth
                  size="large"
                  style={{ backgroundColor: "#fccfcf" }}
                  onClick={() => {
                    navigate(`/orderdetails/${element.orderId}`);
                  }}
                >
                  Xem
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
      <div className="h-20"></div>
    </Page>
  );
};

export default UserOrders;
