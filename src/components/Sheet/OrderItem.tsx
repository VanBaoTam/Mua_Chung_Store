import React, { useState } from "react";
import { Box, useTheme } from "zmp-ui";
import { CartProductModel } from "../../models";
import { ConvertPrice } from "../../utils/Prices";
import CartSheet from "./CartSheet";
const OrderItem = (props: CartProductModel) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  function handleRemove() {
    setIsRemoved(true);
  }
  function handleShown() {
    setTimeout(() => {
      setIsShown(false);
    }, 300);
  }

  return (
    <Box>
      {isRemoved ? null : (
        <Box
          flex
          mx={4}
          my={2}
          p={4}
          alignItems="center"
          className="bg-white rounded-lg"
          onClick={() => {
            setIsShown(true);
          }}
        >
          {isShown ? (
            <CartSheet
              {...props}
              handleShown={handleShown}
              handleRemove={handleRemove}
            />
          ) : null}
          <img
            src={props.photo_links}
            alt="Order Item's image"
            className="w-16 rounded-lg"
          />
          <div className="grow px-2 flex justify-around items-center">
            <p className="rounded-full bg-gray-200 text-blue-600 block w-8 h-6 text-center">
              {props.quantity}
            </p>
            <span className="px-1">x</span>
            <h4 className="font-semibold overflow-hidden maxw">{props.name}</h4>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400">
              {ConvertPrice(Number(props.price), props.quantity)}VNĐ
            </p>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default OrderItem;
