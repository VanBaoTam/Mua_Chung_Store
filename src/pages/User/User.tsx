import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Page, Text } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import guest from "../../static/icons/Guest_avatar.jpg";
import { handleGetUserInfoFromBE, handleLogin } from "../../services/User";
import {
  Logout,
  handlegetUserInfo,
  setFirstTime,
  setFollowed,
  updatePoint,
} from "../../features/User/UserSlice";
import { BsChevronRight } from "react-icons/bs";
import Loading from "../../components/Modal/Loading";
import FollowOA from "../../components/User/FollowOA";
import UnFollowOA from "../../components/User/UnfollowOA";
import { handleIncreasePoint } from "../../services/Points";
import { setFromChatBot } from "../../features/PreviousUser/PreviousSlice";
const User = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((store) => store.user);
  const previous = useAppSelector((store) => store.previous);
  const [userId, setUserId] = useState<string>("");
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
      setIsLoaded(false);
      if (previous.fromchatbot == 1) {
        const resp = await handleIncreasePoint(userId, 1);
        dispatch(setFromChatBot(2));
      }
      const extraUserInfo = await handleGetUserInfoFromBE(userId);
      console.log(extraUserInfo);
      setTimeout(() => {
        dispatch(updatePoint(extraUserInfo.point));
        dispatch(setFirstTime(extraUserInfo.firstTimeBuy));
        dispatch(setFollowed(extraUserInfo.followOA));
        setIsLoaded(true);
      }, 500);
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
        flex
        justifyContent="space-between"
        alignItems="center"
        onClick={() => {
          navigate("/orders");
        }}
      >
        <Text>Đơn hàng của bạn</Text>
        <BsChevronRight />
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
        flex
        justifyContent="space-between"
        alignItems="center"
        onClick={() => {
          navigate("/top");
        }}
      >
        <Text>Top các mã mua chung đang hoạt động</Text>
        <BsChevronRight />
      </Box>
    </Box>
  );
  return (
    <Page hideScrollbar={true}>
      {isLoaded ? null : <Loading />}
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
                  Điểm: {userInfo.point}
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
      {userInfo.userInfo.id ? (
        <>
          {userInfo.isFollowed ? <UnFollowOA /> : <FollowOA />}
          {userInfo.userInfo.id ? orderBox : null}
        </>
      ) : null}
      {openGroupBuyBox}
      <Box
        mx={4}
        my={2}
        px={4}
        py={2}
        flex
        justifyContent="center"
        className="bg-white rounded-lg  font-semibold"
        flexWrap
      >
        {userInfo.userInfo.id ? (
          <Button
            fullWidth={true}
            size="large"
            style={{
              backgroundColor: "#BE3455",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
            onClick={handleLogOut}
          >
            Đăng xuất
          </Button>
        ) : (
          <Button
            fullWidth={true}
            size="large"
            style={{
              backgroundColor: "#BE3455",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0pksx 32px 16px",
            }}
            onClick={handleSignIn}
          >
            Đăng nhập
          </Button>
        )}
      </Box>
    </Page>
  );
};

export default User;
