import React, { useState } from "react";
import { Button, Modal, Box } from "zmp-ui";
import { handleLogin } from "../../services/User";
import { useAppDispatch } from "../../hooks/hooks";
import { handlegetUserInfo } from "../../features/User/UserSlice";

export default function LoginRequired(props) {
  const [popupVisible, setPopupVisible] = useState(true);
  const { handleSignin, signInOnModal } = props;
  const dispatch = useAppDispatch();
  function handleClick() {
    if (signInOnModal) {
      async function handleSignIn() {
        await handleLogin();
        await dispatch(handlegetUserInfo());
      }
      handleSignIn();
      setPopupVisible(false);
    } else {
      handleSignin();
      setPopupVisible(false);
    }
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
          style={{
            backgroundColor: "#BE3455",
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
          onClick={async () => {
            setPopupVisible(false);
          }}
        >
          Đóng
        </Button>
        <Button
          style={{
            backgroundColor: "#BE3455",
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
          onClick={handleClick}
        >
          Đăng nhập
        </Button>
      </Box>
    </Modal>
  );
}
