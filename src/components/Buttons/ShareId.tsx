import React from "react";
import { Box, Button } from "zmp-ui";
import { shareLinkGroupBuy } from "../../services/Order";
const ShareId = (props) => {
  const { username, idGroupBuy, orderId, userId } = props;
  async function handleShareId() {
    const resp = await shareLinkGroupBuy(username, idGroupBuy, orderId, userId);
  }
  return (
    <Box p={4} className="absolute bottom-0 left-0 w-full bg-white">
      <Box px={4} className="w-full">
        <Button
          fullWidth={true}
          size="medium"
          style={{ backgroundColor: "#f6bebe" }}
          onClick={handleShareId}
        >
          Chia sẻ
        </Button>
      </Box>
    </Box>
  );
};

export default ShareId;
