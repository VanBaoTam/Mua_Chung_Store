import React from "react";
import { Box, Input } from "zmp-ui";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  return (
    <Box flex alignItems="center" p={1} justifyContent="space-between">
      <div className="w-10/12">
        <Input.Search
          placeholder="Tìm kiếm sản phẩm"
          onSearch={(text) => console.log(text)}
        />
      </div>
      <button
        className="w-10 bg-white h-12 rounded-lg"
        onClick={() => navigate("/cart")}
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </Box>
  );
};

export default SearchBar;
