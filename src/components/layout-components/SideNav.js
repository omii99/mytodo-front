import React from "react";
import { Avatar, Button, Col, Layout, Space, Tabs } from "antd";
import { connect } from "react-redux";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_DARK,
  NAV_TYPE_SIDE,
} from "constants/ThemeConstant";
import { Scrollbars } from "react-custom-scrollbars";
import MenuContent from "./MenuContent";
import MenuContentAdmin from "./MenuContentAdmin";
import {
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import AvatarStatus from "../shared-components/AvatarStatus";
import navigationConfig from "configs/NavigationConfig";
import navigationAdminConfig from "configs/NavigationAdminConfig";

const { Sider } = Layout;
const profileImg = "/img/avatars/thumb-11.jpg";

export const SideNav = ({
  navCollapsed,
  sideNavTheme,
  routeInfo,
  hideGroupTitle,
  localization = true,
}) => {
  const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };
  return (
    <Sider
      className={`side-nav ${
        sideNavTheme === SIDE_NAV_DARK ? "side-nav-dark" : ""
      }`}
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      <Scrollbars autoHide>

        <div className={"ml-2"}>
        
              <MenuContent
                type={NAV_TYPE_SIDE}
                data={navigationConfig}
                {...props}
              />
           
        </div>
      </Scrollbars>
    </Sider>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme } = theme;
  return { navCollapsed, sideNavTheme };
};

export default connect(mapStateToProps)(SideNav);
