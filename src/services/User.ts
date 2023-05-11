import axios from "axios";
import { getAccessToken } from "zmp-sdk";
import { getUserInfo, getPhoneNumber } from "zmp-sdk/apis";
import { login } from "zmp-sdk/apis";
export const getUserId = async (): Promise<any> => {
  try {
    const { userInfo } = await getUserInfo({});
    return userInfo.id;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const handleLogin = async () => {
  try {
    const resp = await login({});
  } catch (error) {
    // login thất bại
    console.log(error);
  }
};
const HandleAccessToken = async () => {
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

export const handlegetGroupBuyIdFromOrders = async (
  userId: string,
  orderId: string
) => {
  try {
    const resp = await axios.get(
      `https://app.muachung.co/api/groupbuy/user/${userId}/${orderId}/getgroupbuyid`
    );
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

const getPhoneNumberByToken = async (
  token: string,
  userAccessToken: string | undefined
) => {
  try {
    const resp = await axios.get(`https://app.muachung.co/api/zalo/user-info`, {
      params: {
        userAccessToken: userAccessToken,
        token: token,
      },
    });
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
};

export const getUserPhoneNumber = async () => {
  await getPhoneNumber({
    success: async (data) => {
      // xử lý khi gọi api thành công
      let { token } = data;
      console.log(token);
      // xử lý cho trường hợp sử dụng phiên bản Zalo mới (phiên bản lớn hơn 23.02.01)
      if (token) {
        const accesstoken = await HandleAccessToken();
        const phonenumber = await getPhoneNumberByToken(token, accesstoken);
        console.log(phonenumber);
        return phonenumber;
      }
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    },
  });
};

export const handleGetUserInfoFromBE = async (userId: string) => {
  try {
    const resp = await axios.post(
      `https://app.muachung.co/api/user/login`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
