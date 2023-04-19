import React, { useState } from "react";
import { Page, Button, Text, Modal, Box } from "zmp-ui";

export default function AddressRequired() {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Số nhà, tên đường không được để trống!"
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