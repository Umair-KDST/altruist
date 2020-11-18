import React, { Component } from "react";
import "./assets/styles/styles.scss";
import { connect } from "react-redux";
import { login, setUser } from "../../store/actions/authActions";
import { Redirect, Link, Route } from "react-router-dom";
import { Form, Input, Button } from "antd";
import logo from "./logo.png";

const layout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

class Login extends Component {
  onFinish = (values) => {
    this.props.login(values.username, values.password);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const { loginErr } = this.props;
    if (localStorage.getItem("user")) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          {loginErr !== "" ? (
            <div className="alert alert-warning alert-dismissible" role="alert">
              {loginErr}
            </div>
          ) : (
            <React.Fragment />
          )}
          <div
            className="vh-100 d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: "white" }}
          >
            <div className="signin-form ">
              <div className="d-flex justify-content-center">
                <img src={logo} height="100px" style={{ padding: "12px" }} />
              </div>
              <Form
                {...layout}
                name="basic"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Username is required",
                    },
                  ]}
                >
                  <Input placeholder="Username" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <div className="text-right" style={{ marginBottom: "12px" }}>
                    Don't have an account ? <Link to="/signup">Sign Up</Link>
                  </div>
                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.user,
  loginErr: state.auth.loginErr,
});

export default connect(mapStateToProps, { login, setUser })(Login);
