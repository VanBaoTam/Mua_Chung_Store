import React, { useState } from "react";
import { Icon } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import TopGroupLogin from "../Modal/TopGroupLogin";
import { setFollowed } from "../../features/User/UserSlice";
import { handleFollowOA, handleUnfollowOA } from "../../services/Zalo";

function FollowOABubble() {
  const [isLogined, setIslogined] = useState<boolean>(true);
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  async function handleSignin() {
    setIslogined(true);
  }
  async function handleFollow() {
    dispatch(setFollowed(true));
    await handleFollowOA(user.userInfo.id);
  }
  async function handleUnfollow() {
    dispatch(setFollowed(false));
    await handleUnfollowOA(user.userInfo.id);
  }
  function handleToggleFollow() {
    if (user.userInfo.name == "iNiTiAl" || !user.userInfo.id) {
      setIslogined(false);
      setTimeout(() => {
        setIslogined(true);
      }, 2000);
      return;
    } else if (!user.isFollowed) handleFollow();
    else handleUnfollow();
    console.log(user.isFollowed);
  }
  return (
    <>
      {!isLogined && (
        <TopGroupLogin handleSignin={handleSignin} signInOnModal={true} />
      )}
      <div
        onClick={handleToggleFollow}
        className="absolute z-10 right-5 bottom-16 bg-slate-100 rounded-md opacity-80 "
      >
        <Icon icon="zi-notif-ring" style={{ color: "#BE3455" }} size={40} />
      </div>
    </>
  );
}

export default FollowOABubble;
