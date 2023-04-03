import React from "react";
import { Box } from "zmp-ui";
import IMAGES from "../static/products/index";
import { useNavigate } from "react-router-dom";
const Product = (props) => {
  const navigate = useNavigate();
  const imagePos = "p" + props.id;
  return (
    <Box
      className="bg-white rounded-lg"
      style={{ width: "47%" }}
      onClick={() => navigate(`/detail-product/${props.id}`)}
    >
      <h1>{props.nameProduct}</h1>
      <img src={IMAGES[imagePos]} alt="test" />
      <span>{props.salePrice}</span>
    </Box>
  );
};

export default Product;
