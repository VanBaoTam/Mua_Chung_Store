import React, { useState } from "react";
import { Button } from "zmp-ui";
import ProductSheet from "../ProductSheet";
const AddToCart = () => {
  const [isShown, setIsShown] = useState(false);
      
  return (
    <>
      {isShown ? <ProductSheet /> : null}
      <Button
        fullWidth
        size="medium"
        onClick={() => setIsShown((prev) => !prev)}
      >
        Thêm vào giỏ
      </Button>
    </>
  );
};

export default AddToCart;
