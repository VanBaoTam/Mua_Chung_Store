import React, { useState } from "react";
import { Page, Button, Text, Modal, Box } from "zmp-ui";

export default function CodeRequired() {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Mã mua chung không được để trống!"
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box p={6}>
        <Button
          onClick={() => {
            setPopupVisible(false);
          }}
          style={{ backgroundColor: "#f6bebe" }}
          fullWidth
        >
          Xác nhận
        </Button>
      </Box>
    </Modal>
  );
}
