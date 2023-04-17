import React, { useState } from "react";
import { Page, Button, Text, Modal, Box } from "zmp-ui";

export default function OrderSuccess() {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Thanh toán thành công!"
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box p={6}>
        <Button
          onClick={() => {
            setPopupVisible(false);
          }}
          fullWidth
        >
          Xác nhận
        </Button>
      </Box>
    </Modal>
  );
}
