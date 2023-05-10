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
  const searchParams = new URLSearchParams(location.search);
  const idGroupBuyLocation = searchParams.get("idGroupBuy");
  const { idGroupBuy } = useParams();
  const dispatch = useAppDispatch();
  console.log(idGroupBuy, idGroupBuyLocation);
  useEffect(() => {
    if (idGroupBuy != undefined) {
      dispatch(setOrderCode(idGroupBuy));
    } else if (idGroupBuyLocation != undefined && idGroupBuyLocation != null) {
      dispatch(setOrderCode(idGroupBuyLocation));
    }
  }, [idGroupBuy, idGroupBuyLocation]);
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
