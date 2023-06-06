import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Text } from "zmp-ui";
import {
  getAmountUser,
  shareLinkGroupBuy,
  shareLinkTop,
} from "../../services/Order";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Loading from "../Modal/Loading";
import { handleIncreasePoint } from "../../services/Points";
import { updatePoint } from "../../features/User/UserSlice";

export default function OrderSuccess(props) {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>(0);
  const [popupVisible, setPopupVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const userInfo = useAppSelector((store) => store.user);
  useEffect(() => {
    async function handlegetAmount() {
      const amountUser = await getAmountUser(props.code);
      if (amountUser[0].amount > 0) {
        setAmount(amountUser[0].amount);
        setIsLoaded(true);
      }
    }
    handlegetAmount();
  }, []);
  const orderSuccessCompo = (
    <Modal
      visible={popupVisible}
      title="Thanh toán thành công!"
      onClose={() => {
        setPopupVisible(false);
        props.handleFinish();
      }}
    >
      <Box flex flexDirection="column">
        <Box>
          <Box py={2}>
            <Text bold>Mã mua chung:</Text>
            <Text> {props.code}</Text>
          </Box>
          <Box py={2}>
            <Text bold>Thời hạn kết thúc:</Text>
            <Text> {props.Delaydate.toLocaleString()}</Text>
          </Box>
          <Box py={2}>
            <Text bold>Tổng số người đã tham gia:</Text>
            <Text> {amount} </Text>
          </Box>
        </Box>
        <Box flex justifyContent="space-around" py={2}>
          <Box>
            <Button
              onClick={async () => {
                const resp = await shareLinkGroupBuy(
                  userInfo.userInfo.name,
                  props.code,
                  props.orderId,
                  userInfo.userInfo.id
                );

                const changePoint = await handleIncreasePoint(
                  userInfo.userInfo.id,
                  1
                );
                dispatch(updatePoint(changePoint.point));

                setPopupVisible(false);
                props.handleFinish();
              }}
              style={{
                backgroundColor: "#BE3455",
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
              }}
            >
              Chia sẻ
            </Button>
          </Box>
          <Box>
            <Button
              style={{
                backgroundColor: "#BE3455",
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
              }}
              onClick={() => {
                setPopupVisible(false);
                props.handleFinish();
              }}
            >
              Đóng
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
  return <>{isLoaded ? orderSuccessCompo : <Loading />};</>;
}
