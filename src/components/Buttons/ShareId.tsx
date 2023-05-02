import React from "react";
import { Box, Button } from "zmp-ui";
import { shareLinkGroupBuy } from "../../services/Order";
const ShareId = (props) => {
  const { username, idGroupBuy, handleConfirm } = props;
  async function handleShareId() {
    const resp = await shareLinkGroupBuy(username, idGroupBuy);
    console.log(resp);
    handleConfirm();
  }
  return (
    <Box
      flex
      justifyContent="space-around"
      p={4}
      className="absolute bottom-0 left-0 w-full bg-white"
    >
      <Box className="w-5/12">
        <Button
          fullWidth={true}
          size="medium"
          style={{ backgroundColor: "#fccfcf" }}
          onClick={handleConfirm}
        >
          Đóng
        </Button>
      </Box>
      <Box className="w-5/12">
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
