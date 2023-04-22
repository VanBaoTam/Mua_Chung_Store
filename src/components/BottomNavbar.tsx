import React, { useState } from "react";
import { BottomNavigation, Icon, Page } from "zmp-ui";
const BottomNavigationPage = () => {
  const [activeTab, setActiveTab] = useState("chat");
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
};

export default BottomNavigationPage;
