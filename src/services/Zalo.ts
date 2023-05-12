import { openChat, followOA, unfollowOA } from "zmp-sdk/apis";
import { getIdByOA, handleToggleFollowOA } from "./User";

export const handleFollowOA = async (userId: string) => {
  try {
    await followOA({
      id: "3553899238149499553",
    });
    const idByOA = await getIdByOA();
    await handleToggleFollowOA(userId, true, idByOA);
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
    const idByOA = undefined;
    await handleToggleFollowOA(userId, false, idByOA);
    return true;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    return false;
  }
};
