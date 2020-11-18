import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Layout, Typography, Button, Upload, message } from "antd";
import { DynamicForm } from "../../components";
import { config } from "../../Config";
import { signUp, setUser } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./assets/styles/styles.scss";

const { Content } = Layout;
const { Title } = Typography;
const { userTypeList, genderList } = config;

const SignUp = (props) => {
  const { loginErr } = props;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    cnic: "",
    userType: 1,
    gender: 1,
    username: "",
    password: "",
    profile_picture: "",
    cnic_front: "",
    cnic_back: "",
  });

  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      setLoading(false);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      setLoading(false);
    }
    return isJpgOrPng && isLt2M;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const userFields = [
    [
      {
        type: "text",
        // className: "text-center",
        data: user.firstName,
        name: "First Name",
        onChange: (e) => {
          setUser({
            ...user,
            firstName: e.target.value,
          });
        },
      },
      {
        type: "text",
        data: user.lastName,
        name: "Last Name",
        onChange: (e) => {
          setUser({
            ...user,
            lastName: e.target.value,
          });
        },
      },
    ],
    [
      {
        type: "text",
        data: user.email,
        name: "Email",
        onChange: (e) => {
          setUser({
            ...user,
            email: e.target.value,
          });
        },
      },
      {
        type: "text",
        data: user.phone,
        name: "Phone",
        onChange: (e) => {
          setUser({
            ...user,
            phone: e.target.value,
          });
        },
      },
    ],
    [
      {
        type: "text",
        lg: 11,
        data: user.address,
        name: "Address",
        onChange: (e) => {
          setUser({
            ...user,
            address: e.target.value,
          });
        },
      },
      {
        type: "custom",
        lg: { span: 4, offset: 1 },
        // className: "text-center",
        name: "Profile Picture",
        content: (
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={(info) => {
              if (info.file.status === "uploading") {
                // this.setState({ loading: true });
                setLoading(true);
                return;
              }
              if (info.file.status === "done") {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (imageUrl) => {
                  setLoading(false);
                  setUser({
                    profile_picture: imageUrl,
                  });
                });
              }
            }}
          >
            {user.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        ),
      },
      {
        type: "custom",
        lg: 4,
        // lg: { span: 4, offset: 1 },
        name: "CNIC Front",
        // className: "text-center",
        content: (
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={(info) => {
              if (info.file.status === "uploading") {
                // this.setState({ loading: true });
                setLoading(true);
                return;
              }
              if (info.file.status === "done") {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (imageUrl) => {
                  setLoading(false);
                  setUser({
                    cnic_front: imageUrl,
                  });
                });
              }
            }}
          >
            {user.cnic_front ? (
              <img
                src={user.cnic_front}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        ),
      },
      {
        type: "custom",
        name: "CNIC Back",
        lg: 4,
        // className: "text-center",
        content: (
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={(info) => {
              if (info.file.status === "uploading") {
                // this.setState({ loading: true });
                setLoading(true);
                return;
              }
              if (info.file.status === "done") {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (imageUrl) => {
                  setLoading(false);
                  setUser({
                    cnic_back: imageUrl,
                  });
                });
              }
            }}
          >
            {user.cnic_back ? (
              <img
                src={user.cnic_back}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        ),
      },
    ],

    [
      {
        type: "date",
        data: user.dob,
        name: "Date of Birth",
        onChange: (e, event) => {
          // console.log(event)
          setUser({
            ...user,
            dob: event,
          });
        },
      },
      {
        type: "text",
        data: user.cnic,
        name: "CNIC",
        onChange: (e) => {
          setUser({
            ...user,
            cnic: e.target.value,
          });
        },
      },
    ],
    [
      {
        type: "select",
        data: userTypeList,
        name: "Account Type",
        value: user.userType,
        allowClear: { isTure: false },
        showSearch: { isTure: false },
        onChange: (e, event) => {
          console.log(event);
          setUser({
            ...user,
            userType: event.value,
          });
        },
      },
      {
        type: "select",
        data: genderList,
        name: "Gender",
        value: user.gender,
        allowClear: { isTure: false },
        showSearch: { isTure: false },
        onChange: (e, event) => {
          console.log(event);
          setUser({
            ...user,
            gender: event.value,
          });
        },
      },
    ],
    [
      {
        type: "text",
        data: user.username,
        name: "Username",
        onChange: (e) => {
          setUser({
            ...user,
            username: e.target.value,
          });
        },
      },
      {
        type: "password",
        data: user.password,
        name: "Password",
        onChange: (e) => {
          setUser({
            ...user,
            password: e.target.value,
          });
        },
      },
    ],

    [
      {
        type: "custom",
        lg: 23,
        content: (
          <div className="text-right mt-2">
            <Button className="mr-3">Reset</Button>
            <Button
              type="primary"
              onClick={() =>
                props.signUp({
                  ...user,
                  dob: moment(user.dob, "DD-MM-YYYY").valueOf(),
                })
              }
            >
              Create User
            </Button>
          </div>
        ),
      },
    ],
  ];

  if (localStorage.getItem("user")) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout>
        <Content style={{ textAlign: "center" }}>
          <Title level={2} className="mt-2">
            New User
          </Title>
          <Content className="mx-4 mt-5">
            {loginErr !== "" ? (
              <div
                className="alert alert-warning alert-dismissible"
                role="alert"
              >
                {loginErr}
              </div>
            ) : (
              <React.Fragment />
            )}
            <Form size={"large"} layout="vertical">
              <DynamicForm script={userFields} />
            </Form>
          </Content>
        </Content>
      </Layout>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth.user,
  loginErr: state.auth.loginErr,
});

export default connect(mapStateToProps, { signUp, setUser })(SignUp);
