import React, { useState } from "react";
import { Button } from "zmp-ui";
import ProductSheet from "../ProductSheet";
const AddToCart = () => {
  const [isShown, setIsShown] = useState(false);
  function handleShown() {
    setTimeout(() => {
      setIsShown(false);
    }, 300);
  }

  return (
    <>
      {isShown ? <ProductSheet handleShown={handleShown} /> : null}
      <Button fullWidth size="medium" onClick={() => setIsShown(() => true)}>
        Thêm vào giỏ
      </Button>
    </>
  );
};

export default AddToCart;
