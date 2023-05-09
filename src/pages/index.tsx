import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import BottomNavigationPage from "../components/Layout/BottomNavbar";
import Carousel from "../components/Testing/Slider";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page hideScrollbar={true} className="p-3">
      <SearchBar />
      <Carousel />
      <Categories />
      <BottomNavigationPage />
      <footer className="p-8"></footer>
    </Page>
  );
};

export default HomePage;
