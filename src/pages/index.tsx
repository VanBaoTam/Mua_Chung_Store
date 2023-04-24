import React, { useEffect } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import BottomNavigationPage from "../components/BottomNavbar";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { handlegetUserInfo } from "../features/User/UserSlice";
import { handlegetAccessToken } from "../services/User";

const HomePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handlegetUserInfo());
  }, []);
  handlegetAccessToken();

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
