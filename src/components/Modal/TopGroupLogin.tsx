import React, { useState } from "react";
import { Button, Modal, Box } from "zmp-ui";
import { handleLogin } from "../../services/User";
import { useAppDispatch } from "../../hooks/hooks";
import { handlegetUserInfo } from "../../features/User/UserSlice";

export default function TopGroupLogin(props) {
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
      title="Xin hãy đăng nhập để tham gia nhận điểm thưởng ... Chỉ 1 Click"
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box flex justifyContent="space-between">
        <Button
          style={{ backgroundColor: "#fccfcf" }}
          onClick={async () => {
            setPopupVisible(false);
          }}
        >
          Đóng
        </Button>
        <Button style={{ backgroundColor: "#f6bebe" }} onClick={handleClick}>
          Đăng nhập
        </Button>
      </Box>
    </Modal>
  );
}
