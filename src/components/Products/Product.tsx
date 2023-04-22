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
      <img src={props.photo_links} alt="Product's img" />
      <h1 className="font-semibold text-xl">{props.name}</h1>
      <span className="text-red-400 font-semibold">
        {ConvertPrice(props.price, 1)}VNĐ
      </span>
    </Box>
  );
};

export default Product;
