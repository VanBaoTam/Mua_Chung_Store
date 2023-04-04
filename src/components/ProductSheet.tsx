import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Radio, Sheet } from "zmp-ui";
import IMAGES from "../static/products";
import { useAppSelector } from "../hooks/hooks";
import { wrap } from "module";
const ProductSheet = () => {
  const [sheetVisible, setSheetVisible] = useState(true);
  const [amount, setAmount] = useState(0);
  const [size, setSize] = useState("S");
  const productList = useAppSelector((store) => store.products);
  const param = useParams();
  const product = productList.Products.find((item) => item.id === param.id)!;
  return (
    <Sheet
      height={400}
      visible={sheetVisible}
      onClose={() => setSheetVisible(false)}
      autoHeight
      mask
      handler
      swipeToClose
      title="Chọn chi tiết"
    >
      <Box flex p={4}>
        <img
          src={IMAGES["p" + product.id]}
          alt="Product's image"
          className="w-1/3"
        />
        <div className="grow">
          <h4 className="font-bold h-3 text-lg">{product.nameProduct}</h4>
          <p className="text-red-600 mt-4 text-xs">
            {product.salePrice}.000VNĐ
          </p>
          <div>
            <span>Số lượng</span>
            <button
              className="ml-4"
              onClick={() => setAmount((prev) => prev - 1)}
            >
              -
            </button>
            <span className="ml-4">{amount}</span>
            <button
              className="ml-4"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
      </Box>

      <Box p={1} flex flexDirection="column" flexWrap={true}>
        <h4>Size:</h4>
        <Radio.Group defaultValue="S" name="S">
          <Radio size="small" name="S" value="S" label="S" />
          <Radio size="small" name="M" value="M" label="M" />
          <Radio size="small" name="L" value="L" label="L" />
          <Radio size="small" name="XL" value="XL" label="XL" />
        </Radio.Group>
      </Box>
      <Box></Box>
    </Sheet>
  );
};

export default ProductSheet;
