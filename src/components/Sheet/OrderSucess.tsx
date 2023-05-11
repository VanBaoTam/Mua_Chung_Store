import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Text } from "zmp-ui";
import { getAmountUser, shareLinkGroupBuy } from "../../services/Order";
import { useAppSelector } from "../../hooks/hooks";
import Loading from "../Modal/Loading";

export default function OrderSuccess(props) {
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
                await shareLinkGroupBuy(
                  userInfo.userInfo.name,
                  props.code,
                  props.orderId,
                  userInfo.userInfo.id
                );
                setPopupVisible(false);
                props.handleFinish();
              }}
              style={{ backgroundColor: "#f6bebe" }}
            >
              Chia sẻ
            </Button>
          </Box>
          <Box>
            <Button
              style={{ backgroundColor: "#fccfcf" }}
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
