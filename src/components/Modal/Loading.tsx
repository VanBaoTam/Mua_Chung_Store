import React, { useState } from "react";
import { Box, Spinner, Text } from "zmp-ui";

export default function Loading() {
  return (
    <Box
      mt={1}
      flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className="z-20 absolute w-full bg-background h-screen overflow-hidden"
    >
      <Text.Title size="small">Đang cập nhật</Text.Title>
      <Spinner
        visible
        logo={
          "https://w.ladicdn.com/s250x250/5cfe2dbab5f9462fe64cd2dd/m-logo-trong-cunfashion-shorst-3-20230209153455-nrh68.png"
        }
      />
    </Box>
  );
}
