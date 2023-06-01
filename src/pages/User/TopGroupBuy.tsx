import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Page, Text } from "zmp-ui";
import { popularGroupBuyId } from "../../services/GroupBuy";
import Loading from "../../components/Modal/Loading";
import Countdown from "../../utils/Coundown";
import { calculatePoint } from "../../utils/calculatePoint";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import PopUpModal from "../../components/Modal/PopUpModal";
import { setOrderCode } from "../../features/Order/OrderSlice";
import { useNavigate } from "react-router-dom";
import { shareLinkTop } from "../../services/Order";
import { handleIncreasePoint } from "../../services/Points";
import TopGroupLogin from "../../components/Modal/TopGroupLogin";
import { updatePoint } from "../../features/User/UserSlice";

const TopGroupBuy = () => {
  const distpatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  const [isLogined, setIsLogined] = useState<boolean>(true);
  const [number, setNumber] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [successShare, setSuccessShare] = useState<boolean>(false);
  const [successJoin, setSuccessJoin] = useState<boolean>(false);
  const [successText, setSuccessText] = useState<string>("");
  const today = new Date();
  const [data, setData] = useState<any>("init");
  async function getPopularGroupBuy() {
    const resp = await popularGroupBuyId();
    if (resp) {
      setData(resp);
      setIsLoaded(true);
    }
  }
  async function handleSignin() {
    setIsLogined(true);
  }
  function handleJoinCode(idGroupBuy: string) {
    if (user.userInfo.name == "iNiTiAl" || !user.userInfo.id) {
      setIsLogined(false);
      return;
    }
    if (!idGroupBuy) return;
    distpatch(setOrderCode(idGroupBuy));
    setSuccessJoin(true);
    setTimeout(() => {
      setSuccessJoin(false);
    }, 2000);
  }
  function handleShareCode(idGroupBuy: string) {
    if (user.userInfo.name == "iNiTiAl") {
      setIsLogined(false);
      return;
    }
    if (!idGroupBuy) return;
    async function handleShareLinkTop() {
      const resp = await shareLinkTop(user.userInfo.name, idGroupBuy);
      console.log(resp);
      if (resp !== -1) {
        setSuccessShare(true);
        setNumber(resp);
        setSuccessText(`Chia sẻ mã mua chung cho ${resp} người thành công!`);
        const changePoint = await handleIncreasePoint(user.userInfo.id, resp);
        distpatch(updatePoint(changePoint.point));
        setTimeout(() => {
          setSuccessShare(false);
        }, 5000);
      }
    }
    handleShareLinkTop();
  }
  useEffect(() => {
    getPopularGroupBuy();
  }, []);
  const EmptyTopGroupBuy = (
    <Box pt={10} className="bg-white rounded-lg h-full text-center">
      <Icon icon="zi-minus-circle" />
      <Text size="xLarge">Không có mã mua chung nào</Text>
      <Text size="xLarge"> đang hoạt động ...</Text>
    </Box>
  );
  return (
    <Page hideScrollbar={true}>
      {!isLogined && (
        <TopGroupLogin handleSignin={handleSignin} signInOnModal={true} />
      )}
      {successShare && number && <PopUpModal title={successText} />}
      {successJoin && <PopUpModal title="Tham gia mã mua chung thành công" />}
      {isLoaded ? (
        data.length > 0 ? (
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
                    <Box
                      flex
                      flexDirection="column"
                      width={90}
                      textAlign="right"
                    >
                      <Text bold>Thời hạn</Text>
                      <Text>
                        <Countdown targetDate={groupBuy.delayTime} />
                      </Text>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    Chiết khấu tạm tính:
                    <span className="text-red-400">
                      &nbsp;
                      {calculatePoint(groupBuy.amount) * 100} %
                    </span>
                  </Box>

                  <Box flex justifyContent="center" flexWrap py={3}>
                    <Button
                      size="large"
                      style={{
                        backgroundColor: "#BE3455",
                        width: "45%",
                        boxShadow:
                          "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                      }}
                      onClick={() => {
                        handleShareCode(groupBuy.idGroupBuy);
                      }}
                    >
                      Chia sẻ
                    </Button>
                    <Button
                      fullWidth={true}
                      size="large"
                      style={{
                        backgroundColor: "#BE3455",
                        boxShadow:
                          "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                        width: "45%",
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        handleJoinCode(groupBuy.idGroupBuy);
                      }}
                    >
                      Tham gia
                    </Button>
                  </Box>
                </Box>
              );
            else return null;
          })
        ) : (
          EmptyTopGroupBuy
        )
      ) : (
        <Loading />
      )}
    </Page>
  );
};

export default TopGroupBuy;
