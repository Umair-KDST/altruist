import React, { useRef, useEffect, useState } from "react";
import { Layout, Button, Row, Col, Typography } from "antd";
import { NewPost, UpdatePost } from "../../components";
import { Route, Link, Redirect } from "react-router-dom";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";

import {
  FormControl,
  InputAdornment,
  Input,
  makeStyles,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { getPost } from "../../store/actions/postActions";
import "./assets/css/styles.scss";

const useStyles = makeStyles((theme) => ({
  search: {
    margin: theme.spacing(2),
    width: "100%",
  },
}));

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = (props) => {
  const [searchKey, setSearchKey] = useState("");
  // useEffect(() => {
  //   inputRef.current.children[1].focus();
  // });
  // useEffect(() => {
  //   // if (searchKey !== '') {
  //   // getPost('')
  //   // console.log('header wali posts ', getPost(searchKey))
  //   // }

  // }, []);
  const styles = useStyles();
  const inputRef = useRef(null);
  const { user, search, query, logout, getPost, posts } = props;

  // const handleKey = (e) => {
  //   if (e.key === "Enter") {
  //     getPost(searchKey);
  //   }
  // };
  const userLogout = () => {
    // return < Redirect to="/login" />
    logout()

  }

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Row>
        <Col span={13} offset={1}>
          {/* <FormControl className={styles.search}>
            <Input
              placeholder="Search for Events, People, Organizations"
              className="text-white"
              ref={inputRef}
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
                // getPost(searchKey)
              }}
              onKeyPress={(e) => handleKey(e)}
              startAdornment={
                <InputAdornment position="start">
                  <Search className="search-icon" />
                </InputAdornment>
              }
            />
          </FormControl> */}
        </Col>

        <Col span={3} offset={1} className="text-right">
          {/* <Link to="/dashboard/newPost">
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
            >
              New Post
            </Button>
           
          </Link> */}
        </Col>
        <Col span={3} offset={1} className="text-center">
          <Text className="text-white font-weight-bold">
            {/* {user.username.toUpperCase()} */}
            Admin
          </Text>
        </Col>
        <Col span={2} className="text-right">
          <Button
            onClick={() => userLogout()}
            className="btn-logout"
            type="primary"
            shape="round"
            icon={<LogoutOutlined />}
            size={"large"}
          />
        </Col>
      </Row>
      {/* <Route to='/dashboard' component={() =>}/> */}

      <Route
        path="/dashboard/newPost"
        // component={NewPost}
        render={(props) => <NewPost {...props} isAuthed={true} />}
      />

      {/* <Route path="/dashboard/updatePost"
        // component={UpdatePost}
        render={(props) => (<UpdatePost {...props} isAuthed={true} />)}
      /> */}
    </Header>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  posts: state.post.posts,
});

export default connect(mapStateToProps, {
  logout,
  getPost,
})(CustomHeader);
