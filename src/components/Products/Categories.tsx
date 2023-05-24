import React from "react";
import { Box } from "zmp-ui";
import { useAppSelector } from "../../hooks/hooks";
import Product from "./Product";
import ProductPagination from "./Pagination";

const Categories = () => {
  const products = useAppSelector((store) => store.products);
  console.log(products.page);
  const productList = products.Products.slice(
    products.loadedPages.indexOf(products.page) * 20,
    products.loadedPages.indexOf(products.page) * 20 + 20
  ).map((productItem) => <Product key={productItem.id} {...productItem} />);
  console.log(
    products.loadedPages.indexOf(products.page) * 20,
    products.loadedPages.indexOf(products.page) * 20 + 20
  );
  return (
    <>
      <Box flex flexWrap justifyContent="space-between" className="gap-3">
        {productList}
      </Box>
      <ProductPagination />
    </>
  );
};

export default Categories;
