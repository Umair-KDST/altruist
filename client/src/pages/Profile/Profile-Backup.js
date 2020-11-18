import "./assets/styles/styles.scss";
import { connect } from "react-redux";
import { login, setUser } from "../../store/actions/authActions";
import { getUserByUsername } from "../../store/actions/userActions";

import { Redirect } from "react-router-dom";
import { getUser } from "../../store/actions/userActions";
import React, { useEffect, useCallback, useState, Component } from "react";
import { Form, Button, Modal, Layout, Row, Col } from "antd";
import moment from "moment";
import FormBuilder from "antd-form-builder";
import Column from "antd/lib/table/Column";
const { Content } = Layout;

// const MOCK_INFO = {
//   name: { first: "Khunshan", last: "Butt" },
//   email: "khunshan.butt@gmail.com",
//   gender: "Male",
//   dateOfBirth: moment("1997-07-27"),
//   phone: "03214441444",
//   city: "Lahore",
//   address: "Wafaqi Colony Road, Johar Town",
// };
// const DateView = ({ value }) => value;

const Profile = (props) => {
  // useEffect(() => {

  //   getUser();

  // }, []);
  const { user, getUserByUsername, profile } = props;
  const [form] = FormBuilder.useForm();
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(user.user);

  const queryString = window.location.search;
  // console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const usnm = urlParams.get('u');

  useEffect(() => {

    getUserByUsername(usnm)

  }, []);




  const handleFinish = useCallback((values) => {
    console.log("Submit: ", values);
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setPersonalInfo(values);
      setViewMode(true);
      Modal.success({
        title: "Success",
        content: "Infomation updated.",
      });
    }, 1500);
  });
  const meta = {
    columns: 2,
    disabled: pending,
    initialValues: profile.length ? profile[0] : personalInfo,
    fields: [
      { name: ["name", "firstName"], label: "First Name", required: true },
      { name: ["name", "lastName"], label: "Last Name", required: true },
      {
        key: "gender",
        label: "Gender",
        widget: "radio-group",
        options: ["Male", "Female"],
      },
      {
        key: "dob",
        label: "Date of Birth",
        widget: "date-picker",
        viewWidget: ({ value }) => <>{moment(value).format("YYYY - MM - D")}</>,
      },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "address", label: "Address", colSpan: 2 },
      { key: "city", label: "City" },
      { key: "zipCode", label: "Zip Code" },
    ],
  };

  return (
    <Content>
      <Row>
        {/* {console.log("queryString is : ", queryString)}
        {console.log("urlParams is : ", urlParams)}

        {console.log("username should be here : ", urlParams.get('u'))}

        {console.log("profile is", profile)}
        {console.log("personal info is", personalInfo)} */}
        {console.log("profile is", profile)}
        {/* {setPersonalInfo(profile[0])} */}
        <Col span={22} offset={2}>
          <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: "800px" }}>
            <h1
              style={{
                height: "40px",
                fontSize: "16px",
                marginTop: "50px",
                color: "#888",
              }}
            >
              Personal Infomation
              {viewMode && (
                <Button type="link" onClick={() => setViewMode(false)} style={{ float: "right" }}>
                  Edit
                </Button>
              )}
            </h1>
            <FormBuilder form={form} meta={meta} viewMode={viewMode} />
            {!viewMode && (
              <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
                <Button htmlType="submit" type="primary" disabled={pending}>
                  {pending ? "Updating..." : "Update"}
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setViewMode(true);
                  }}
                  style={{ marginLeft: "15px" }}
                >
                  Cancel
                </Button>
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </Content>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,

});

export default connect(mapStateToProps, { getUserByUsername })(Profile);
