import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getProducts } from "../../features/Products/ProductSlice";
// import { getCodes, DeleteAll } from "../features/Code/CodeSlice";
const Initializer = ({ type }) => {
  const Products = useAppSelector((store) => store.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Products.isLoaded == false && type == "Products")
      dispatch(getProducts());
  }, []);
  // if (type == "Codes")
  //   useEffect(() => {
  //     dispatch(getCodes());
  //   }, []);
  return <></>;
};

export default Initializer;
