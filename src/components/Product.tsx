import React from "react";
import { Box } from "zmp-ui";
import IMAGES from "../static/products/index";
import { useNavigate } from "react-router-dom";
const Product = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      px={2}
      pb={3}
      className="bg-white rounded-lg"
      style={{ width: "47%" }}
      onClick={() => navigate(`/detail-product/${props.id}`)}
    >
      <img src={IMAGES["p" + props.id]} alt="test" />
      <h1 className="font-semibold text-xl">{props.nameProduct}</h1>
      <span className="text-red-400 font-semibold">
        {props.salePrice}.000VNĐ
      </span>
    </Box>
  );
};

export default Product;
