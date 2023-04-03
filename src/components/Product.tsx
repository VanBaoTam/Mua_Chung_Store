import React from "react";
import { Box } from "zmp-ui";
import IMAGES from "../static/products/index";
const Product = (props) => {
  const imagePos = "p" + props.id;
  return (
    <Box className="bg-white w-32 rounded-lg">
      <h1>{props.nameProduct}</h1>
      <img src={IMAGES[imagePos]} alt="test" />
      <span>{props.salePrice}</span>
    </Box>
  );
};

export default Product;
