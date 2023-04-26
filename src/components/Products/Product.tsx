import React from "react";
import { Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { ConvertPrice } from "../../utils/Prices";
const Product = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      pb={3}
      className="bg-white rounded-lg"
      style={{ width: "47%" }}
      onClick={() => navigate(`/detail-product/${props.id}`)}
    >
      <img src={props.photo_links} className="h-40" alt="Product's img" />
      <Box p={2}>
        <h1
          className="font-semibold text-lg block max-w-xs overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {props.name}
        </h1>
        <span className="text-red-400 font-semibold">
          {ConvertPrice(props.price, 1)}VNĐ
        </span>
      </Box>
    </Box>
  );
};

export default Product;
