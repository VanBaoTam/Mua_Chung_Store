import React, { useState } from "react";
import { Button, Modal, Box } from "zmp-ui";

export default function LoginRequired(props) {
  const [popupVisible, setPopupVisible] = useState(true);
  const { handleSignin } = props;
  function handleClick() {
    handleSignin();
    setPopupVisible(false);
  }
  return (
    <Modal
      visible={popupVisible}
      title="Xin hãy đăng nhập để tiếp tục thanh toán! Hệ thống sẽ tạo giúp bạn tài khoản nếu bạn lần đầu sử dụng app"
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box flex justifyContent="space-between">
        <Button
          variant="secondary"
          onClick={async () => {
            setPopupVisible(false);
          }}
        >
          Đóng
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Đăng nhập
        </Button>
      </Box>
    </Modal>
  );
}
