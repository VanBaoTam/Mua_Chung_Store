import React, { useEffect, useState } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { VscHome } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { BsCart, BsCartFill } from "react-icons/bs";
import { BsGrid, BsGridFill } from "react-icons/bs";
import { RiSearch2Line, RiSearch2Fill } from "react-icons/ri";
const BottomNavigationPage = () => {
  const location = useLocation();
  const allowedRoutes = ["/", "/user", "/orders", "/cart", "/discovery"];
  const [activeTab, setActiveTab] = useState("home");
  const isRouteAllowed = allowedRoutes.includes(location.pathname);
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
            key="search"
            label="Tìm kiếm"
            icon={<RiSearch2Line />}
            activeIcon={<RiSearch2Fill />}
          />
          <BottomNavigation.Item
            key="discovery"
            label="Khám phá"
            icon={<BsGrid />}
            activeIcon={<BsGridFill />}
            linkTo="/discovery"
          />
          <BottomNavigation.Item
            key="home"
            label="Trang chủ"
            icon={<VscHome />}
            activeIcon={<TiHome />}
            linkTo="/"
          />
          <BottomNavigation.Item
            key="cart"
            label="Giỏ hàng"
            icon={<BsCart />}
            activeIcon={<BsCartFill />}
            linkTo="/cart"
          />
          <BottomNavigation.Item
            key="me"
            label="Cá nhân"
            icon={<Icon icon="zi-user" />}
            activeIcon={<Icon icon="zi-user-solid" />}
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
