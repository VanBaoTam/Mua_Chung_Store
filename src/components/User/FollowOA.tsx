import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text } from "zmp-ui";
import { handleFollowOA } from "../../services/Zalo";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setFollowed } from "../../features/User/UserSlice";

export default function FollowOA() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((store) => store.user.userInfo.id);

  return (
    <Box
      mx={4}
      my={2}
      px={4}
      py={2}
      flex
      className="bg-white rounded-lg  font-semibold"
      flexWrap
      flexDirection="column"
    >
      <Button
        fullWidth={true}
        size="large"
        style={{
          backgroundColor: "#BE3455",
          boxShadow:
            "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        }}
        onClick={() => {
          async function handleFollow() {
            dispatch(setFollowed(true));
            await handleFollowOA(userId);
          }
          handleFollow();
        }}
      >
        <Box
          style={{ fontWeight: "bold" }}
          flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>Đăng ký nhận mã ưu đãi!</Text>
        </Box>
      </Button>
    </Box>
  );
}
