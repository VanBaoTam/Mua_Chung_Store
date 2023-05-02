import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Text } from "zmp-ui";
import { getAmount, shareLinkGroupBuy } from "../../services/Order";
import { useAppSelector } from "../../hooks/hooks";

export default function OrderSuccess(props) {
  const [amount, setAmount] = useState<number>(0);
  const [popupVisible, setPopupVisible] = useState(true);

  const userInfo = useAppSelector((store) => store.user);
  useEffect(() => {
    async function handlegetAmount() {
      const amountUser = await getAmount(props.code);
      console.log(amountUser);
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
          <Box>
            <Button
              onClick={async () => {
                await shareLinkGroupBuy(userInfo.userInfo.name, props.code);
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
}
