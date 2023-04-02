import React, { useState } from "react";
import { BottomNavigation, Icon, Page } from "zmp-ui";
const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("chat");
  return (
    <Page className="page">
      <BottomNavigation
        id="BotNav"
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        <BottomNavigation.Item
          key="home"
          label="Trang chủ"
          icon={<Icon icon="zi-home" />}
          activeIcon={<Icon icon="zi-home" />}
        />
        <BottomNavigation.Item
          label="Khám phá"
          key="discovery"
          icon={<Icon icon="zi-more-grid" />}
          activeIcon={<Icon icon="zi-more-grid-solid" />}
        />
        <BottomNavigation.Item
          key="me"
          label="Cá nhân"
          icon={<Icon icon="zi-user" />}
          activeIcon={<Icon icon="zi-user-solid" />}
        />
      </BottomNavigation>
    </Page>
  );
};

export default BottomNav;
