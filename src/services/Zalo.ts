import { openChat, followOA, unfollowOA } from "zmp-sdk/apis";

export const openChatScreen = async (userId: string) => {
  try {
    await openChat({
      type: "oa",
      id: "3553899238149499553",
      message: "Mua Chung Store testing",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
export const handlefollowOA = async () => {
  try {
    const res = await followOA({
      id: "xxxx",
    });
    console.log(res);
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const handleUnfollowOA = async () => {
  try {
    const res = await unfollowOA({
      id: "xxxx",
    });
    console.log(res);
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
