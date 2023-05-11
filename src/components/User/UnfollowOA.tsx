import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text } from "zmp-ui";
import { handleUnfollowOA } from "../../services/Zalo";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setFollowed } from "../../features/User/UserSlice";

export default function UnFollowOA() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((store) => store.user.userInfo.id);
  const navigate = useNavigate();
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
      <button
        onClick={() => {
          async function handleUnfollow() {
            dispatch(setFollowed(false));
            await handleUnfollowOA(userId);
          }
          handleUnfollow();
        }}
      >
        <Box flex justifyContent="space-between" alignItems="center">
          <Text>Hủy đăng ký nhận mã</Text>
          <BsChevronRight />
        </Box>
      </button>
    </Box>
  );
}
