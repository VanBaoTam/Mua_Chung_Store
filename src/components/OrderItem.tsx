import React from "react";
import IMAGES from "../static/products";
import { Box } from "zmp-ui";
import { OrderModel } from "../models";
import { ConvertPrice } from "../utils/ConvertPrice";
const OrderItem = (props: OrderModel) => {
  return (
    <Box
      flex
      mx={4}
      my={2}
      p={4}
      alignItems="center"
      className="bg-white rounded-lg"
    >
      <img
        src={IMAGES["p" + props.id]}
        alt="Order Item's image"
        className="w-10 rounded-lg"
      />
      <div className="grow px-4 flex justify-around">
        <p className="rounded-full bg-gray-200 text-blue-600 block w-8 text-center">
          {props.quantity}
        </p>
        x<h4 className="font-semibold">{props.nameProduct}</h4>
      </div>
      <div>
        <p className="text-xs font-semibold">
          {" "}
          {ConvertPrice(Number(props.salePrice), props.quantity)}
        </p>
      </div>
    </Box>
  );
};

export default OrderItem;
