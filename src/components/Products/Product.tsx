import React, { useState } from "react";
import { Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { ConvertPrice, ConvertSalePrice } from "../../utils/Prices";
const Product = (props) => {
  const [price, setPrice] = useState<String>(ConvertPrice(props.price, 1));
  const [salePrice, setSalePrice] = useState<String>(
    ConvertSalePrice(
      props.price - (props.price * props.sales[0].sale_percent) / 100,
      1
    )
  );
  const navigate = useNavigate();
  return (
    <Box
      pb={3}
      className="bg-white rounded-lg"
      style={{ width: "47%" }}
      onClick={() => navigate(`/detail-product/${props.id}`)}
    >
      <img
        src={props.photo_links}
        style={{ height: "200px" }}
        alt="Product's img"
      />
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
        {props.sales[0].sale_percent == 0 ? (
          <span className="text-red-400 font-semibold">{price}đ</span>
        ) : (
          <span className="text-black line-through">{price}đ</span>
        )}
        <br />
        {props.sales && props.sales[0].sale_percent !== 0 && (
          <span className="text-red-400 font-semibold text-lg">
            SALE: {salePrice}đ
          </span>
        )}
      </Box>
    </Box>
  );
};

export default Product;
