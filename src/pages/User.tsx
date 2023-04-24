import React from "react";
import { Avatar, Box, Page, Text } from "zmp-ui";
import { useAppSelector } from "../hooks/hooks";
const User = () => {
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
        <Box>
          <Text>GroupBuy's Detail Box</Text>
        </Box>
        <Box mt={5} className="border-gray-300 border-t-gray-300 ">
          <Text>GroupBuy's Detail Box</Text>
        </Box>
        <Box mt={5}>
          <Text>GroupBuy's Detail Box</Text>
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
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
      >
        <Text>Tempo</Text>
      </Box>
    </Page>
  );
};

export default User;
