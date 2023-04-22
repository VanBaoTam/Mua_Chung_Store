import React from "react";
import { Avatar, Box, Page, Text } from "zmp-ui";
const User = () => {
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
          <Avatar  />
          <Box ml={6}>
            <Text>Username</Text>
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
      >
        <Text>Group Buy</Text>
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
        <Text>History</Text>
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
        <Text>History</Text>
      </Box>
    </Page>
  );
};

export default User;
