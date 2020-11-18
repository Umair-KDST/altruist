import React, { useRef, useEffect, useState } from "react";
import { Layout, Button, Row, Col, Typography, Menu } from "antd";
import { NewPost, UpdatePost } from "../../components";
import { Route, Link } from "react-router-dom";
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
    // width: "100%",
  },
}));

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = (props) => {
  const [searchKey, setSearchKey] = useState('')
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

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      getPost(searchKey)
    }
  }
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 10px" }}>
        {/* <Col span={24}> */}

        <div >
          <FormControl
            className={styles.search}
          >
            <Input
              placeholder="Search"
              className="text-white"
              ref={inputRef}
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value)
                // getPost(searchKey)
              }}
              onKeyPress={(e) => handleKey(e)}
              startAdornment={
                <InputAdornment position="start">
                  <Search className="search-icon" />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ padding: "0px 6px" }} className="text-center">
            <Text className="text-white font-weight-bold">
              {user.username.toUpperCase()}
            </Text>
          </div>
          <div style={{ padding: "0px 6px" }} className="text-right">
            <Link to="/dashboard/newPost">
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="large"
              >
                New Post
            </Button>
            </Link>
            {/* <Text className="text-white font-weight-bold mr-3">New Post</Text>
            <PlusOutlined
              onClick={() => {}}
              style={{ color: "white", fontSize: 24 }}
            /> */}

          </div>
          <div style={{ padding: "0px 6px" }} className="text-right">
            <Button
              // style={{ backgroundColor: "red" }}
              onClick={() => logout()}
              className="btn-logout-nav"
              // type="danger"
              shape="round"
              icon={<LogoutOutlined />}
              size={"large"}
            />
          </div>
        </div>

        {/* </Col> */}
      </div>
      {/* <Route to='/dashboard' component={() =>}/> */}

      <Route path="/dashboard/newPost"
        // component={NewPost} 
        render={(props) => (<NewPost {...props} isAuthed={true} />
        )} />


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
  logout, getPost
})(CustomHeader);
