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
        style={{
          backgroundColor: "#BE3455",
          boxShadow:
            "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        }}
        onClick={() => navigate("/cart")}
      >
        Đến giỏ hàng
      </Button>
      <Button
        size="medium"
        style={{
          backgroundColor: "#BE3455",
          boxShadow:
            "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        }}
        onClick={() => setIsShown(true)}
      >
        Thêm vào giỏ hàng
      </Button>
    </Box>
  );
};

export default AddToCart;
