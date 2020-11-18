import React, { useEffect, useState } from "react";
import { SideNav, Header } from "../components";
import { connect } from "react-redux";
import { setUser, logout } from "../store/actions/authActions";
import { getUserById } from "../store/actions/userActions";

import { Layout, Spin } from "antd";
import { Redirect } from "react-router-dom";
import Routes from "../routes";
import "./assets/styles/styles.scss";
import { Route, Switch } from "react-router-dom";

// import { } from 'react-hot'
const { Footer } = Layout;

const CustomLayout = (props) => {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      props.setUser();
    }
  }, [null]);


  useEffect(() => {
    console.log('useEffect mein user is ', props.user)

    if (props.user !== null) {
      props.getUserById(props.user.user._id)
    }
  }, [props.user])

  useEffect(() => {

    if (props.current !== null) {
      // console.log('this user is ', props.current.enabled)
      if (props.current.enabled === false) {
        props.logout();
      }
    }

  }, [props.current])



  if (!JSON.parse(localStorage.getItem("user")) && !props.user) {
    return <Redirect to="/login" />;
  } else if (!props.user) {
    return (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }

  if (props.user.user.userType === 2) {
    console.log("Admin wali condition", props.user.userType);
    return <Redirect to="/admin" />;
  }

  // const keyMap = {
  //   SNAP_LEFT: "command+left",
  //   DELETE_NODE: ["del", "backspace"],
  // };

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "600px" }}>
      {console.log("Admin wali condition", props.user)}
      {console.log('current is ', props.current)}
      <SideNav />
      <Layout className="site-layout">
        <Header />
        <Routes />
        <Footer style={{ textAlign: "center" }}>
          ALTRUIST - Help others so you could be helped too!
        </Footer>
      </Layout>
      {/* </HotKeys> */}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  current: state.profile.current
});

export default connect(mapStateToProps, { setUser, logout, getUserById })(CustomLayout);
