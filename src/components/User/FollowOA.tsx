import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";

export default function FollowOA() {
  const navigate = useNavigate();
  return (
    <Box
      mx={4}
      my={2}
      px={4}
      py={2}
      flex
      className="bg-white rounded-lg  font-semibold"
      flexWrap
      flexDirection="column"
    >
      <Box
        flex
        justifyContent="space-between"
        alignItems="center"
        onClick={() => {
          console.log("FOLLOWED OA");
        }}
      >
        <Text>Đăng ký nhận các mã ưu đãi!</Text>
        <BsChevronRight />
      </Box>
    </Box>
  );
}
