import React from "react";
import { Input } from "zmp-ui";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SearchBar = () => {
  return (
    <div className="flex items-center">
      <Input.Search
        placeholder="Tìm kiếm sản phẩm"
        onSearch={(text) => console.log(text)}
      />
      <button className="w-8 bg-white h-12 rounded-lg">
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </div>
  );
};

export default SearchBar;
