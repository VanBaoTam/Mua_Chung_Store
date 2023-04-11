import React from "react";
import { Box } from "zmp-ui";
import { useAppSelector } from "../hooks/hooks";
import Product from "./Product";

const Categories = () => {
  const products = useAppSelector((store) => store.products);
  const productList = products.Products.map((productItem) => {
    return <Product key={productItem.id} {...productItem}></Product>;
  });
  console.log(products.Products);
  return (
    <>
      <Box flex flexWrap justifyContent="space-between" className="gap-3">
        {productList}
      </Box>
    </>
  );
};

export default Categories;
