import React, { useState } from "react";
import { Button, Modal, Box } from "zmp-ui";

export default function OrderFail(props) {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Có lỗi xảy ra, thanh toán không thành công!"
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box flex flexDirection="column">
        <Box flex justifyContent="space-around">
          <Button
            style={{ backgroundColor: "#fccfcf" }}
            onClick={() => {
              setPopupVisible(false);
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
