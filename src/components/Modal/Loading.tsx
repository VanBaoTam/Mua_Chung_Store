import React, { useState } from "react";
import { Modal, Box, Spinner, Text } from "zmp-ui";

export default function Loading() {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Đang cập nhật ..."
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box
        mt={6}
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner visible logo={""} />
      </Box>
    </Modal>
  );
}
