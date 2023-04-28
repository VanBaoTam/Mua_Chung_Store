import React, { useState } from "react";
import { Page, Button, Text, Modal, Box } from "zmp-ui";

export default function LocationRequired() {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Không được để trống các thanh chọn địa chỉ!"
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
