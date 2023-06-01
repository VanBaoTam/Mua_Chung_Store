import React, { useEffect, useState } from "react";
import { BottomNavigation } from "zmp-ui";
import { VscHome } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { BsCart, BsCartFill } from "react-icons/bs";
import { BsGrid, BsGridFill } from "react-icons/bs";
import {
  RiSearch2Line,
  RiSearch2Fill,
  RiUserLine,
  RiUserFill,
} from "react-icons/ri";
const BottomNavigationPage = () => {
  const location = useLocation();
  const allowedRoutes = [
    "/",
    "/user",
    "/orders",
    "/cart",
    "/discovery",
    "/top",
  ];
  const [activeTab, setActiveTab] = useState("home");
  const isRouteAllowed = allowedRoutes.includes(location.pathname);
  const searchStyle = activeTab === "search" ? { color: "#BE3455" } : undefined;
  const discoveryStyle =
    activeTab === "discovery" ? { color: "#BE3455" } : undefined;
  const homePageStyle = activeTab === "home" ? { color: "#BE3455" } : undefined;
  const cartStyle = activeTab === "cart" ? { color: "#BE3455" } : undefined;
  const userStyle = activeTab === "me" ? { color: "#BE3455" } : undefined;

  useEffect(() => {
    if (location.pathname == "/") setActiveTab("home");
    else if (location.pathname == "/cart") setActiveTab("cart");
    else if (location.pathname == "/discovery") setActiveTab("discovery");
    else setActiveTab("me");
  }, [location]);
  if (isRouteAllowed) {
    return (
      <>
        <BottomNavigation
          id="BotNav"
          fixed
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        >
          <BottomNavigation.Item
            style={searchStyle}
            key="search"
            label="Tìm kiếm"
            icon={<RiSearch2Line />}
            activeIcon={<RiSearch2Fill color="#BE3455" />}
          />
          <BottomNavigation.Item
            style={discoveryStyle}
            key="discovery"
            label="Khám phá"
            icon={<BsGrid />}
            activeIcon={<BsGridFill color="#BE3455" />}
            linkTo="/discovery"
          />
          <BottomNavigation.Item
            style={homePageStyle}
            key="home"
            label="Trang chủ"
            icon={<VscHome />}
            activeIcon={<TiHome color="#BE3455" />}
            linkTo="/"
          />
          <BottomNavigation.Item
            style={cartStyle}
            key="cart"
            label="Giỏ hàng"
            icon={<BsCart />}
            activeIcon={<BsCartFill color="#BE3455" />}
            linkTo="/cart"
          />
          <BottomNavigation.Item
            style={userStyle}
            key="me"
            label="Cá nhân"
            icon={<RiUserLine />}
            activeIcon={<RiUserFill />}
            linkTo="/user"
          />
        </BottomNavigation>
      </>
    );
  } else {
    return null;
  }
};

export default BottomNavigationPage;
