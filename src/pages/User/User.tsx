import React, { useState, useEffect } from "react";
import { Avatar, Box, Page, Text } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import guest from "../../static/icons/Guest_avatar.jpg";
import { getUser, handleLogin } from "../../services/User";
const User = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLogined, setIsLogined] = useState(false);
  const userInfo = useAppSelector((store) => store.user);
  function handleLogOut() {
    setIsLogined(false);
  }
  async function handleSignIn() {
    await handleLogin();
  }
  // try {
  //   const resp = await dispatch(getUser);
  //   console.log(resp);
  //   setIsLogined(true);
  // } catch (error) {
  //   console.log(error);
  // }
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
          {isLogined ? (
            <Avatar
              src={userInfo.userInfo.avatar}
              size={40}
              className="!h-10"
            />
          ) : (
            <img src={guest} className="h-10 w-10" />
          )}

          <Box ml={6} flex flexDirection="column">
            {isLogined ? (
              <>
                <Text size="xLarge" bold={true}>
                  Xin chào, {userInfo.userInfo.name}
                </Text>
                <Text size="small" className="mt-1">
                  Points: 99999
                </Text>
              </>
            ) : (
              <>
                {" "}
                <Text size="xLarge" bold={true}>
                  Khách
                </Text>
                <Text size="small" className="mt-1">
                  Points: 0
                </Text>
              </>
            )}
          </Box>
        </Box>
      </Box>

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
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        className="bg-white rounded-lg  font-semibold"
        flexWrap
      >
        {isLogined ? (
          <Text onClick={handleLogOut}>Đăng xuất</Text>
        ) : (
          <Text onClick={handleSignIn}>Đăng nhập</Text>
        )}
      </Box>
    </Page>
  );
};

export default User;
