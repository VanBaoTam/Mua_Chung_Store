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
