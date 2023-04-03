import React from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="p-3">
      <SearchBar />
      <h1>Test HomePage</h1>
      <Categories />
    </Page>
  );
};

export default HomePage;
