import React, { useEffect, useState } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useLocation } from "react-router-dom";
const BottomNavigationPage = () => {
  const location = useLocation();
  const allowedRoutes = ["/", "/user", "/orders"];
  const [activeTab, setActiveTab] = useState("home");
  const isRouteAllowed = allowedRoutes.includes(location.pathname);
  useEffect(() => {
    if (location.pathname == "/") setActiveTab("home");
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
            key="home"
            label=""
            icon={<Icon icon="zi-home" />}
            activeIcon={<Icon icon="zi-home" />}
            linkTo="/"
          />
          <BottomNavigation.Item
            key="me"
            label=""
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
