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
        <Button
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
          onClick={() => getCategories(products.access_token)}
        ></Button>
      </Box>
    </Page>
  );
};

export default Discovery;
