import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { getProducts } from "../features/Products/ProductSlice";
import { getCodes } from "../features/Code/CodeSlice";
const Initializer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCodes());
  }, []);
  return <></>;
};

export default Initializer;
