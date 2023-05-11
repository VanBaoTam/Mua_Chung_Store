import { openChat, followOA, unfollowOA } from "zmp-sdk/apis";
import { handleToggleFollowOA } from "./User";

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
export const handleFollowOA = async (userId: string) => {
  try {
    await followOA({
      id: "3553899238149499553",
    });
    await handleToggleFollowOA(userId, true);
    return true;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    return false;
  }
};

export const handleUnfollowOA = async (userId: string) => {
  try {
    await unfollowOA({
      id: "3553899238149499553",
    });
    await handleToggleFollowOA(userId, false);
    return true;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    return false;
  }
};
