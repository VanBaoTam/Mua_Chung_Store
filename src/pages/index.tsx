import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import BottomNavigationPage from "../components/Layout/BottomNavbar";
import Carousel from "../components/Testing/Slider";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useLocation, useParams } from "react-router-dom";
import { setOrderCode } from "../features/Order/OrderSlice";

const HomePage: React.FunctionComponent = () => {
  const location = useLocation();
  console.log(location);
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useAppDispatch();
  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      if (key == "IdGroupBuy" && value) {
        dispatch(setOrderCode(value));
      }
    }
  }, []);
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
