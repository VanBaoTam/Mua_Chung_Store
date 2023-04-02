import React from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/SearchBar";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="p-3">
      <SearchBar />
      <h1>Test HomePage</h1>
    </Page>
  );
};

export default HomePage;
