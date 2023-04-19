import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { getProducts } from "../features/Products/ProductSlice";
// import { getCodes, DeleteAll } from "../features/Code/CodeSlice";
const Initializer = ({ type }) => {
  const dispatch = useAppDispatch();
  if (type == "Products")
    useEffect(() => {
      dispatch(getProducts());
    }, []);
  // if (type == "Codes")
  //   useEffect(() => {
  //     dispatch(getCodes());
  //   }, []);
  return <></>;
};

export default Initializer;
