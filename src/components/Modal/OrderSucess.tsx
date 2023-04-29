import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Text } from "zmp-ui";
import { getAmount, shareLink } from "../../services/Order";
import { useAppSelector } from "../../hooks/hooks";

export default function OrderSuccess(props) {
  const [amount, setAmount] = useState<number>(0);
  const [popupVisible, setPopupVisible] = useState(true);

  const userInfo = useAppSelector((store) => store.user);
  useEffect(() => {
    console.log(props.code);
    async function handlegetAmount() {
      const amountUser = await getAmount(props.code);
      console.log(amountUser[0].amount);
      if (amountUser[0].amount >= 0) setAmount(amountUser[0].amount);
    }
    handlegetAmount();
  }, []);
  return (
    <Modal
      visible={popupVisible}
      title="Thanh toán thành công!"
      onClose={() => {
        setPopupVisible(false);
        props.handleFinish();
      }}
    >
      <Box flex flexDirection="column">
        <Box p={3}>
          <Box mt={3}>
            <Text bold>Mã mua chung:</Text>
          </Box>
          <Box mt={3}>
            <Text> {props.code}</Text>
            <Text bold>Thời hạn kết thúc:</Text>
            <Text> {props.Delaydate.toLocaleString()}</Text>
          </Box>
          <Box mt={3}>
            <Text bold>Tổng số người đã tham gia:</Text>
            <Text> {amount + 1} </Text>
          </Box>
        </Box>
        <Box flex justifyContent="space-around">
          <Button
            onClick={async () => {
              await shareLink(userInfo.userInfo.name, props.code);
              setPopupVisible(false);
              props.handleFinish();
            }}
            style={{ backgroundColor: "#f6bebe" }}
          >
            Chia sẻ
          </Button>
          <Button
            style={{ backgroundColor: "#fccfcf" }}
            onClick={() => {
              setPopupVisible(false);
              props.handleFinish();
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
