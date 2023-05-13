import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Button, Text, Modal, Box } from "zmp-ui";

export default function AccessingTopGroupBuy({ title }) {
  const [popupVisible, setPopupVisible] = useState(true);
  const navigate = useNavigate();
  return (
    <Modal
      visible={popupVisible}
      title={title}
      onClose={() => {
        setPopupVisible(false);
      }}
    >
      <Box p={6}>
        <Button
          onClick={() => {
            setPopupVisible(false);
            navigate("/");
          }}
          style={{ backgroundColor: "#f6bebe" }}
          fullWidth
        >
          Xác nhận
        </Button>
      </Box>
    </Modal>
  );
}
