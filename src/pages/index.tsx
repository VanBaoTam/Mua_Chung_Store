import React, { useEffect } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import { useAppDispatch } from "../hooks/hooks";
import { getProducts } from "../features/Products/Product";
const HomePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <Page hideScrollbar={true} className="p-3">
      <SearchBar />
      <Categories />
      <footer className="p-8"></footer>
    </Page>
  );
};

export default HomePage;
