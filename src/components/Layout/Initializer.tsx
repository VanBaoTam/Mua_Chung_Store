import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getAccessToken,
  getProducts,
  setAccessToken,
} from "../../features/Products/ProductSlice";
const Initializer = ({ type }) => {
  const Products = useAppSelector((store) => store.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function handleGetAccessToken() {
      const resp = await getAccessToken();
      dispatch(setAccessToken(resp));
      if (Products.isLoaded == false && type == "Products") {
        dispatch(getProducts(0));
        dispatch(getProducts(50));
      }
    }
    handleGetAccessToken();
  }, []);
  return <></>;
};

export default Initializer;
