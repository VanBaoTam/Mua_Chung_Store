import React, { useState } from "react";
import { Box, Spinner, Text } from "zmp-ui";

export default function Loading() {
  return (
    <Box
      mt={6}
      flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className="z-50 w-full h-full bg-slate-600"
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
