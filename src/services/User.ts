import axios from "axios";
import { useId } from "react";
import { getAccessToken } from "zmp-sdk";
import { getUserInfo } from "zmp-sdk/apis";

export const getUser = async (): Promise<any> => {
  try {
    const { userInfo } = await getUserInfo({});
    return userInfo.id;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
import { login } from "zmp-sdk/apis";

export const handleLogin = async () => {
  await login({
    success: async () => {
      await getUser();
      console.log("Login success!");
    },
    fail: (error) => {
      // login thất bại
      console.log("Login error with code: " + error);
    },
  });
};

export const handlegetAccessToken = async () => {
  try {
    const accessToken = await getAccessToken({});
    return accessToken;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
export const handlegetOrdersFromUsers = async (userId: string) => {
  try {
    const resp = await axios.get(
      `https://app.muachung.co/api/groupbuy/user/${userId}`
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
