import React, { useState } from "react";
import { Box, Button } from "zmp-ui";
import ProductSheet from "../Products/ProductSheet";
import { useNavigate } from "react-router-dom";
const AddToCart = (props) => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  function handleShown() {
    setTimeout(() => {
      setIsShown(false);
    }, 300);
  }

  return (
    <Box
      flex
      justifyContent="space-around"
      p={4}
      className="absolute bottom-0 left-0 w-full bg-white"
    >
      {isShown ? <ProductSheet {...props} handleShown={handleShown} /> : null}
      <Button
        size="medium"
        variant="secondary"
        onClick={() => navigate("/cart")}
      >
        Đến giỏ hàng
      </Button>
      <Button size="medium" onClick={() => setIsShown(() => true)}>
        Thêm vào giỏ hàng
      </Button>
    </Box>
  );
};

export default AddToCart;
