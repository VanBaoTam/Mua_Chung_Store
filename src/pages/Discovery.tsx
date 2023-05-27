import React from "react";
import { Box, Button, Icon, Page, Text } from "zmp-ui";
import { getCategories } from "../services/Category";
import { useAppSelector } from "../hooks/hooks";

const Discovery = () => {
  const products = useAppSelector((store) => store.products);
  return (
    <Page hideScrollbar={true}>
      <Box pt={10} className="bg-white rounded-lg h-full text-center">
        <Icon icon="zi-minus-circle" />
        <Text size="xLarge">Coming Soon...</Text>
        <Button onClick={() => getCategories(products.access_token)}></Button>
      </Box>
    </Page>
  );
};

export default Discovery;
