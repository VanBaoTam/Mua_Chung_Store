import React, { useState, useEffect } from "react";
import { Avatar, Box, Page, Text } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import guest from "../../static/icons/Guest_avatar.jpg";
import { handleGetUserInfoFromBE, handleLogin } from "../../services/User";
import {
  Logout,
  handlegetUserInfo,
  updatePoint,
} from "../../features/User/UserSlice";
const User = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((store) => store.user);
  const [userId, setUserId] = useState<string>("");
  const [point, setPoint] = useState(-1);
  function handleLogOut() {
    dispatch(Logout());
  }
  async function handleSignIn() {
    await handleLogin();
    await dispatch(handlegetUserInfo());
  }
  useEffect(() => {
    setUserId(userInfo.userInfo.id);
  }, [userInfo]);
  useEffect(() => {
    async function handleGetPoint() {
      const temppoint = await handleGetUserInfoFromBE(userId);
      setPoint(temppoint);
      dispatch(updatePoint(temppoint));
    }
    if (userId != "") {
      handleGetPoint();
    }
  }, [userId]);
  const orderBox = (
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
      <Box
        onClick={() => {
          navigate("/orders");
        }}
      >
        <Text>Đơn hàng của bạn</Text>
      </Box>
    </Box>
  );
  const openGroupBuyBox = (
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
      <Box
        onClick={() => {
          navigate("/top");
        }}
      >
        <Text>Top các mã mua chung đang hoạt động</Text>
      </Box>
    </Box>
  );
  return (
    <Page hideScrollbar={true}>
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
      >
        <Box flex>
          {userInfo.userInfo.id ? (
            <Avatar
              src={userInfo.userInfo.avatar}
              size={40}
              className="!h-10"
            />
          ) : (
            <img src={guest} className="h-10 w-10" />
          )}

          <Box ml={6} flex flexDirection="column">
            {userInfo.userInfo.id ? (
              <>
                <Text size="xLarge" bold={true}>
                  Xin chào, {userInfo.userInfo.name}
                </Text>
                <Text size="small" className="mt-1">
                  Điểm: {point == -1 ? 0 : point}
                </Text>
              </>
            ) : (
              <>
                <Text size="xLarge" bold={true}>
                  Xin chào, Khách
                </Text>
                <Text size="small" className="mt-1">
                  Points: 0
                </Text>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {userInfo.userInfo.id ? orderBox : null}
      {userInfo.userInfo.id ? openGroupBuyBox : null}
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
      >
        {userInfo.userInfo.id ? (
          <Text onClick={handleLogOut}>Đăng xuất</Text>
        ) : (
          <Text onClick={handleSignIn}>Đăng nhập</Text>
        )}
      </Box>
    </Page>
  );
};

export default User;
