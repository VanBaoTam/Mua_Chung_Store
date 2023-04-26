import React, { useState } from "react";
import { Button, Modal, Box, Text } from "zmp-ui";
import { shareLink } from "../../services/Order";

export default function OrderSuccess(props) {
  const [popupVisible, setPopupVisible] = useState(true);
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
            <Text> {props.amount}</Text>
          </Box>
        </Box>
        <Box flex justifyContent="space-around" p={4}>
          <Button
            onClick={async () => {
              await shareLink();
              setPopupVisible(false);
            }}
          >
            Chia sẻ
          </Button>
          <Button
            variant="secondary"
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
