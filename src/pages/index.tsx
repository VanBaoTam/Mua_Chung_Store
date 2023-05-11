import React, { useEffect } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import BottomNavigationPage from "../components/Layout/BottomNavbar";
import Carousel from "../components/Testing/Slider";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useLocation } from "react-router-dom";
import {
  setGroupbuyId,
  setOrderId,
  setUserId,
} from "../features/PreviousUser/PreviousSlice";
import PreviousModal from "../components/Modal/PreviousModal";
import { getOrderFromUser } from "../services/Order";
interface previousOrderModel {
  groupbuyId: string;
  order: [];
  finalCost: number;
}
const HomePage: React.FunctionComponent = () => {
  const [isPrevious, setIsPrevious] = React.useState<boolean>(false);
  const [previousOrder, setPreviousOrder] =
    React.useState<previousOrderModel>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const previous = useAppSelector((state) => state.previous);
  const dispatch = useAppDispatch();
  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      if (key == "IdGroupBuy" && value) {
        dispatch(setGroupbuyId(value));
      }
      if (key == "orderId" && value) {
        dispatch(setOrderId(value));
      }
      if (key == "userId" && value) {
        dispatch(setUserId(value));
      }
    }
  }, []);
  useEffect(() => {
    async function handleGetPrevious() {
      const resp = await getOrderFromUser(previous.userId, previous.orderId);
      if (resp) {
        const { order, finalCost } = resp;
        const data: previousOrderModel = {
          groupbuyId: previous.groupbuyId,
          order,
          finalCost,
        };
        setPreviousOrder(data);
      }
    }
    if (!previous.isShown)
      if (previous.groupbuyId && previous.orderId && previous.userId) {
        handleGetPrevious();
        setIsPrevious(true);
      }
  }, [previous]);
  return (
    <Page hideScrollbar={true} className="p-3">
      {isPrevious ? <PreviousModal {...previousOrder} /> : null}
      <SearchBar />
      <Carousel />
      <Categories />
      <BottomNavigationPage />
      <footer className="p-8"></footer>
    </Page>
  );
};

export default HomePage;
