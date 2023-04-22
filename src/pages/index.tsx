import React from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import BottomNavigationPage from "../components/BottomNavbar";

const HomePage: React.FunctionComponent = () => {
  
  return (
    <Page hideScrollbar={true} className="p-3">
      <SearchBar />
      <Categories />
      <BottomNavigationPage />
      <footer className="p-8"></footer>
    </Page>
  );
};

export default HomePage;
