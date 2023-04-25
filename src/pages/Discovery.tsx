import React from "react";
import { Box, Icon, Page, Text } from "zmp-ui";

const Discovery = () => {
  return (
    <Page hideScrollbar={true}>
      <Box pt={10} className="bg-white rounded-lg h-full text-center">
        <Icon icon="zi-minus-circle" />
        <Text size="xLarge">Coming Soon...</Text>
      </Box>
    </Page>
  );
};

export default Discovery;
