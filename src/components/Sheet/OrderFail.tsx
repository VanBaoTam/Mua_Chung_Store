import React, { useState } from "react";
import { Button, Modal, Box } from "zmp-ui";

export default function OrderFail(props) {
  const [popupVisible, setPopupVisible] = useState(true);
  return (
    <Modal
      visible={popupVisible}
      title="Có lỗi xảy ra, thanh toán không thành công!"
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box flex flexDirection="column">
        <Box flex justifyContent="space-around">
          <Button
            style={{
              backgroundColor: "#BE3455",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
            onClick={() => {
              setPopupVisible(false);
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
