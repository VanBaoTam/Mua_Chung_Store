import React, { useEffect, useState } from "react";
import { Box, Page } from "zmp-ui";
import { popularGroupBuyId } from "../../services/GroupBuy";

const TopGroupBuy = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  useEffect(() => {
    const resp = popularGroupBuyId();
    if (resp) {
      setData(resp);
    }
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Page hideScrollbar={true}>
      <Box></Box>
    </Page>
  );
};

export default TopGroupBuy;
