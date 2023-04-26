import React from "react";
import { Avatar, Box, Page, Text } from "zmp-ui";
import { useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
const User = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((store) => store.user);
  return (
    <Page hideScrollbar={true}>
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
      >
        <Box flex>
          <Avatar src={userInfo.userInfo.avatar} size={40} />
          <Box ml={6} flex flexDirection="column">
            <Text size="xLarge" bold={true}>
              {userInfo.userInfo.name}
            </Text>
            <Text size="small" className="mt-1">
              Points: 99999
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
        flexDirection="column"
      >
        <Box
          onClick={() => {
            navigate("/orders");
          }}
        >
          <Text>Đơn hàng của bạn</Text>
        </Box>
      </Box>
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
      >
        <Text>Order's History</Text>
      </Box>
    </Page>
  );
};

export default User;
