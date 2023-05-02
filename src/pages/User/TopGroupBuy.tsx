import React, { useEffect, useState } from "react";
import { Box, Page, Text } from "zmp-ui";
import { popularGroupBuyId } from "../../services/GroupBuy";
import Loading from "../../components/Modal/Loading";
import Countdown from "../../utils/Coundown";
import { calculatePoint } from "../../utils/calculatePoint";

const TopGroupBuy = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const today = new Date();
  const [data, setData] = useState<any>("init");
  async function getPopularGroupBuy() {
    const resp = await popularGroupBuyId();
    if (resp) {
      setData(resp);
      setIsLoaded(true);
    }
  }
  useEffect(() => {
    getPopularGroupBuy();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Page hideScrollbar={true}>
      {isLoaded ? (
        data?.map((groupBuy) => {
          const groupBuyTime = new Date(groupBuy.delayTime);
          if (today < groupBuyTime)
            return (
              <Box
                key={groupBuy._id}
                mx={4}
                my={4}
                px={4}
                py={2}
                className=" bg-white rounded-lg  font-semibold"
                flex
                flexDirection="column"
              >
                <Box flex justifyContent="space-between">
                  <Box flex flexDirection="column" width={120}>
                    <Text bold>Mã mua chung</Text>
                    <Text>{groupBuy.idGroupBuy}</Text>
                  </Box>
                  <Box flex flexDirection="column" textAlign="center">
                    <Text bold>Số lượng</Text>
                    <Text>{groupBuy.amount} người</Text>
                  </Box>
                  <Box flex flexDirection="column" width={90} textAlign="right">
                    <Text bold>Thời hạn</Text>
                    <Text>
                      <Countdown targetDate={groupBuy.delayTime} />
                    </Text>
                  </Box>
                </Box>
                <Box mt={2}>
                  Chiết khấu tạm tính:
                  <span className="text-red-400">
                    {" "}
                    &nbsp;
                    {calculatePoint(groupBuy.amount) * 100} %
                  </span>
                </Box>
              </Box>
            );
          else return null;
        })
      ) : (
        <Loading />
      )}
    </Page>
  );
};

export default TopGroupBuy;
