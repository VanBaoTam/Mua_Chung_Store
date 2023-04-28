import React, { useState } from "react";
import { Button, Modal, Box } from "zmp-ui";

export default function LoginRequired() {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Xin hãy đăng nhập để tiếp tục thanh toán! Hệ thống sẽ tạo giúp bạn tài khoản nếu bạn lần đầu sử dụng app"
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
