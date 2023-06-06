import React, { useEffect, useState } from "react";
import { Button, Modal, Box } from "zmp-ui";
import { handleGetUserInfoFromBE, handleLogin } from "../../services/User";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  handlegetUserInfo,
  updatePoint,
  setFollowed,
  setFirstTime,
} from "../../features/User/UserSlice";
import { handleIncreasePoint } from "../../services/Points";
import { setFromChatBot } from "../../features/PreviousUser/PreviousSlice";

export default function TopGroupLogin(props) {
  const [popupVisible, setPopupVisible] = useState(true);
  const { handleSignin, signInOnModal } = props;
  const previous = useAppSelector((store) => store.previous);
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function handleGetUserBE() {
      handlegetUserInfo();
      if (previous.fromchatbot == 1) {
        const resp = await handleIncreasePoint(user.userInfo.id, 1);
        dispatch(setFromChatBot(2));
      }
      const extraUserInfo = await handleGetUserInfoFromBE(user.userInfo.id);
      if (extraUserInfo)
        setTimeout(() => {
          dispatch(updatePoint(extraUserInfo.point));
          dispatch(setFirstTime(extraUserInfo.firstTimeBuy));
          dispatch(setFollowed(extraUserInfo.followOA));
        }, 300);
    }
    if (user.userInfo.id) handleGetUserBE();
  }, [user]);

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
