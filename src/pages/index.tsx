import React from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
const HomePage: React.FunctionComponent = () => {
  return (
    <Page hideScrollbar={true} className="p-3">
      <SearchBar />
      <Categories />
      <footer className="p-8"></footer>
    </Page>
  );
};

export default HomePage;
