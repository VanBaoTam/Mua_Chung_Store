import React, { useEffect } from "react";
import { Page } from "zmp-ui";
import SearchBar from "../components/Products/SearchBar";
import Categories from "../components/Products/Categories";
import BottomNavigationPage from "../components/Layout/BottomNavbar";
import Carousel from "../components/Testing/Slider";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useLocation } from "react-router-dom";
import {
  setFromChatBot,
  setGroupbuyId,
  setOrderId,
  setUserId,
} from "../features/PreviousUser/PreviousSlice";
import PreviousModal from "../components/Modal/PreviousModal";
import { getOrderFromUser } from "../services/Order";
import { Avatar } from "@mui/material";
import { setOrderCode } from "../features/Order/OrderSlice";
import PopUpModal from "../components/Modal/PopUpModal";
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
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      if (key == "idGroupBuy" && value) {
        dispatch(setGroupbuyId(value));
        dispatch(setOrderCode(value));
      }
      if (key == "orderId" && value) {
        dispatch(setOrderId(value));
      }
      if (key == "userId" && value) {
        dispatch(setUserId(value));
      }
      if (key == "fromchatbot" && value && previous.fromchatbot == 0) {
        dispatch(setFromChatBot(1));
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
      {previous.fromchatbot == 1 && (
        <PopUpModal title="Bạn được tặng 1 điểm, hãy đăng nhập để nhận ngay" />
      )}
      {isPrevious && <PreviousModal {...previousOrder} />}
      {products.page === 0 && (
        <img
          alt="Animated GIF"
          style={{ width: "100%", height: "180px" }}
          src="https://w.ladicdn.com/5cfe2dbab5f9462fe64cd2dd/mc-moi-2705-20230527055820-vp3b8.gif
      "
        />
      )}
      {/* <SearchBar /> */}
      <div style={{ height: "30px" }}></div>
      <Carousel />
      <Categories />
      <BottomNavigationPage />
      <footer className="p-8"></footer>
    </Page>
  );
};

export default HomePage;
