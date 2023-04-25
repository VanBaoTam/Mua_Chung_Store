import React from "react";
import { Box, Input } from "zmp-ui";
const SearchBar = () => {
  return (
    <Box flex alignItems="center" p={1} justifyContent="space-between">
      <div className="w-full">
        <Input.Search
          placeholder="Tìm kiếm sản phẩm"
          onSearch={(text) => console.log(text)}
        />
      </div>
    </Box>
  );
};

export default SearchBar;
