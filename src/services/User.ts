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
