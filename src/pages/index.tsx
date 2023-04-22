import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import BottomNavigationPage from "../components/BottomNavbar";
import { setAcceptRenderNavBar } from "../features/App/AppSlice";
const HomePage: React.FunctionComponent = () => {
  const appFeatures = useAppSelector((store) => store.appFeatures);
  const [isAccepted, setIsAccepted] = useState(true);
  const dispatch = useAppDispatch();
  dispatch(setAcceptRenderNavBar(true));
  useEffect(() => {
    setIsAccepted(appFeatures.isAcceptRenderNavBar);
  }, [appFeatures.isAcceptRenderNavBar]);

  return (
    <Page hideScrollbar={true} className="p-3">
      <SearchBar />
      <Categories />
      {isAccepted ? <BottomNavigationPage /> : null}
      <footer className="p-8"></footer>
    </Page>
  );
};

export default HomePage;
