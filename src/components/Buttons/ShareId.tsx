import React from "react";
import { Box, Button } from "zmp-ui";
import { shareLinkGroupBuy } from "../../services/Order";
import { handleIncreasePoint } from "../../services/Points";
import { updatePoint } from "../../features/User/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
const ShareId = (props) => {
  const { username, idGroupBuy, orderId, userId } = props;
  const dispatch = useAppDispatch();
  async function handleShareId() {
    const resp = await shareLinkGroupBuy(username, idGroupBuy, orderId, userId);

    const changePoint = await handleIncreasePoint(userId, 1);
    dispatch(updatePoint(changePoint.point));
  }
  return (
    <Box p={4} className="absolute bottom-0 left-0 w-full bg-white">
      <Box px={4} className="w-full">
        <Button
          fullWidth={true}
          size="medium"
          style={{
            backgroundColor: "#BE3455",
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
          onClick={handleShareId}
        >
          Chia sẻ
        </Button>
      </Box>
    </Box>
  );
};

export default ShareId;
