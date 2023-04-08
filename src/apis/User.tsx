import { getUserInfo } from "zmp-sdk/apis";

export const getUser = () => {
  getUserInfo({
    success: (data) => {
      // xử lý khi gọi api thành công
      const { userInfo } = data;
      console.log(new Date());
      console.log(userInfo);
      return userInfo;
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    },
  });
};
import { login } from "zmp-sdk/apis";

export const handleLogin = () => {
  login({
    success: () => {
      // login thành công
      console.log("Login success!");
    },
    fail: (error) => {
      // login thất bại
      console.log("Login error with code: " + error);
    },
  });
};
