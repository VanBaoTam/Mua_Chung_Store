import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import BottomNavigationPage from "../components/BottomNavbar";
import { useAppDispatch } from "../hooks/hooks";
import { handlegetUserInfo } from "../features/User/UserSlice";
import { getUserPhoneNumber, handleLogin } from "../services/User";
import Carousel from "../components/Slider";

const HomePage: React.FunctionComponent = () => {
  const [phonenumber, setPhonenumber] = useState<any>("1");
  const [accessToken, setAccessToken] = useState<any>("2");

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   async function handleUserLogin() {
  //     await handleLogin();

  //     dispatch(handlegetUserInfo());
  //   }
  //   handleUserLogin();
  // }, []);
  // useEffect(() => {
  //   async function handle() {
  //     const resp = await getUserPhoneNumber();
  //     setPhonenumber(resp);
  //   }
  //   handle();
  // }, []);
  // useEffect(() => {
  //   console.log("PHONE");
  //   console.log(phonenumber);
  // }, [phonenumber, accessToken]);
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
