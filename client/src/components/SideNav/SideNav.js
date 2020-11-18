import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { onCollapse } from "../../store/actions/sideNavActions";
import "./assets/styles/styles.scss";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  NumberOutlined,
  BellOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = (props) => {
  const { collapsed, onCollapse, user } = props;
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["/"]} mode="inline">
        <Menu.Item key="/">
          <HomeOutlined className={"icon-alignemnt"} />
          <Link to={"/"}>Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <UserOutlined className={"icon-alignemnt"} />
          <Link to={"/dashboard/profile/?u=" + user.username}>Profile</Link>
        </Menu.Item>
        {/* <SubMenu
          key="sub1"
          title={
            <span>
              <NumberOutlined className={"icon-alignemnt"} />
              <span>Explore</span>
            </span>
          }
        >
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <BellOutlined className={"icon-alignemnt"} />
              <span>Notifications</span>
            </span>
          }
        >
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9">
          <SettingOutlined className={"icon-alignemnt"} /> Settings
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => ({
  collapsed: state.sideNav.collapsed,
  user: state.auth.user,
});

export default connect(mapStateToProps, { onCollapse })(SideNav);
