import React, { useEffect, useState, createElement } from "react";
import { connect } from "react-redux";
import {
  Layout,
  Row,
  Col,
  Card,
  Tooltip,
  Comment,
  Avatar,
  Collapse,
  Tabs,
  Radio,
  Table,
  Tag,
  Space,
  Button,
  Spin,
  Modal
} from "antd";
import {
  Maps,
  PostCard,
  EditPost,
  AdminHeader,
  AdminSideNav,
} from "../../components";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  getPost,
  selectPost,
  deletePostById,
} from "../../store/actions/postActions";
import { addVolunteer } from "../../store/actions/volunteerActions";

import { getAllReportedPosts, clearPostReports, deleteReportedPost } from "../../store/actions/reportPostActions";

import { getAllReportedUsers, clearUserReports } from "../../store/actions/reportUserActions";

import { setUser } from "../../store/actions/authActions";
import { getUser, getDisabledUsers, verifyUser, unverifyUser, enableUser, disableUser } from "../../store/actions/userActions";



import {
  UserOutlined,
  CaretDownFilled,
  CaretUpFilled,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { get } from "mongoose";

const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;


const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);
const data = [
  {
    key: "1",
    // firstName: "Khunshan",
    // lastName: "Testing",
    name: {
      firstName: "khunshan",
      lastName: "testing"
    },
    age: 12,
    address: "Kuch offensive",
    tags: ["nice", "developer"],
  },
];

const { Content } = Layout;

const Admin = ({
  // getPost,
  // posts,
  // selectPost,
  // selectedPost,
  user,
  setUser,
  getUser,
  getDisabledUsers,
  users,
  disabledUsers,
  getAllReportedPosts,
  reportedPosts,
  clearPostReports,
  deleteReportedPost,
  getAllReportedUsers,
  reportedUsers,
  clearUserReports,
  verifyUser, unverifyUser,
  enableUser, disableUser

}) => {


  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser();
    }
  }, [null]);

  useEffect(() => {
    getAllReportedPosts();
    getAllReportedUsers();
    getUser();
    getDisabledUsers();
  }, [])

  const [cnic1, setCnic1] = useState(false);
  const [cnic2, setCnic2] = useState(false);


  if (!JSON.parse(localStorage.getItem("user")) && !user) {
    return <Redirect to="/login" />;
  } else if (!user) {
    return (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }

  if (user.user.userType === 1) {
    console.log("ANormal User wali condition", user.userType);
    return <Redirect to="/login" />;
  }



  const deleteRepPost = (e) => {
    deleteReportedPost(e._id)
    // clearPostReps(e)
    clearPostReports(e._id)
    alert("Reported Post Deleted")

  }

  const clearPostReps = (e) => {
    console.log("cleared Post is ", e)
    clearPostReports(e._id)
    alert("Post Reports Ignored")

  }

  const clearUserReps = (e) => {
    clearUserReports(e._id)

    alert("User Reports Ignored")
  }

  const disableRepUser = (e) => {
    disableUser({ "user_id": e._id })
    clearUserReports(e._id)

    alert("Reported User Disabled")


  }

  const enableRepUser = (e) => {
    enableUser({ "user_id": e._id });
    getDisabledUsers();
    getDisabledUsers();

  }

  const verUser = (e) => {
    verifyUser({ "user_id": e._id })
    getUser()
    getUser()
  }

  const unVerUser = (e) => {
    unverifyUser({ "user_id": e._id })
    getUser()
    getUser()
  }


  return (
    <React.Fragment>
      {console.log('user user is ', user)}
      <Row>
        <Col span={24}>
          <AdminHeader />
        </Col>
      </Row>
      <Row>
        {/* <Col>
          <AdminSideNav />
        </Col> */}
        {/* <Col
          // span={16}
          // offset={0}
          style={{ margin: "0 16px", padding: "0px 16px" }}
        >
          <h1>This is Yo Admin Panel</h1>
          <Row>
            <Collapse bordered={false} defaultActiveKey={["1"]}>
              <Panel header="Reported Posts" key="1">
                {text}
              </Panel>
              <Panel header="Reported Users" key="2">
                {text}
              </Panel>
              <Panel header="All" key="3">
                {text}
              </Panel>
            </Collapse>
          </Row>
        </Col> */}

        {/* <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group> */}
        <Col span={24}>
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Reported Post" key="1">
              <Row>
                <Col span={16}>
                  <Table dataSource={reportedPosts.length > 0 ? reportedPosts : []}>
                    <Column
                      title="Posted By"
                      dataIndex="post"
                      key="Post-name"
                      render={(nm) => (
                        <p>{nm["user"]["username"]}</p>

                      )}


                    />
                    <Column title="Title" dataIndex="post" key="post-title" render={(nm) => (

                      <p>{nm['title']}</p>

                    )} />


                    <Column
                      title="Description"
                      dataIndex="post"
                      key="post-text"
                      render={(nm) => (

                        <p>{nm['text']}</p>

                      )}
                    />
                    <Column title="Total Reports" dataIndex="totalReports" key="totalReports" />
                    {/* <Column
                      title="Tags"
                      dataIndex="tags"
                      key="tags"
                      render={(tags) => (
                        <>
                          {tags.map((tag) => (
                            <Tag color="blue" key={tag}>
                              {tag}
                            </Tag>
                          ))}
                        </>
                      )}
                    /> */}
                    <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        // <Space>
                        <div>
                          <Button style={{ marginRight: '20px' }} onClick={() => clearPostReps(record)} type="primary">Ignore</Button>

                          <Button onClick={() => deleteRepPost(record)} type="primary" danger>Delete</Button>

                        </div>
                        // </Space>
                      )}
                    />
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Verify Users" key="2">
              <Row>
                <Col span={16}>
                  <Table dataSource={users.length > 0 ? users : []}>
                    <Column
                      title="Username"
                      dataIndex="user"
                      key="user-name"
                      render={(nm) => (
                        <p>{nm["username"]}</p>

                      )}

                    />

                    <Column
                      title="Cnic"
                      dataIndex="cnic"
                      key="cnic"
                    // render={(nm) => (

                    //   <p>{nm['text']}</p>

                    // )}
                    />
                    {/* <Column title="Title" dataIndex="post" key="post-title" render={(nm) => (

                      <p>{nm['title']}</p>

                    )} />

  */}


                    <Column title="Verified" dataIndex="verified" key="verified" render={(nm) => (
                      <p>{nm ? "yes" : "No"}</p>

                    )} />
                    {/* <Column
                      title="Tags"
                      dataIndex="tags"
                      key="tags"
                      render={(tags) => (
                        <>
                          {tags.map((tag) => (
                            <Tag color="blue" key={tag}>
                              {tag}
                            </Tag>
                          ))}
                        </>
                      )}
                    /> */}
                    <Column
                      title="Action"
                      key="action"

                      render={(text, record) => (
                        // <Space>
                        <div>
                          {record.verified ? (<Button onClick={() => unVerUser(record)} type="primary" danger>Unverify</Button>) : (<Button style={{ marginRight: '20px' }} onClick={() => verUser(record)} type="primary">Verify</Button>)}
                          {/* <Button style={{ marginRight: '20px' }} onClick={() => verUser(record)} type="primary">Verify</Button>

                          <Button onClick={() => unVerUser(record)} type="primary" danger>Unverify</Button> */}

                        </div>
                        // </Space>
                      )}
                    />

                    <Column
                      title="Cnic Front"
                      key="cnic_front"


                      render={(record) => (

                        <div>

                          {<Button onClick={() => setCnic1(true)}>CNIC Front</Button>}
                          {<Modal title="Cnic Front"
                            visible={cnic1}
                            onOk={() => setCnic1(false)}
                            onCancel={() => setCnic1(false)}
                          >
                            <img src={record['cnic_front']}></img>
                          </Modal>}
                        </div>

                      )}
                    />
                    <Column
                      title="Cnic Back"
                      key="cnic_back"


                      render={(record) => (

                        <div>

                          {<Button onClick={() => setCnic2(true)}>CNIC Back</Button>}
                          {<Modal title="Cnic Back"
                            visible={cnic2}
                            onOk={() => setCnic2(false)}
                            onCancel={() => setCnic2(false)}
                          >
                            <img src={record['cnic_back']}></img>
                          </Modal>}
                        </div>

                      )}
                    />


                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab=" Reported Users" key="3">
              <Row>
                <Col span={16}>
                  <Table dataSource={reportedUsers.length > 0 ? reportedUsers : []}>
                    <Column
                      title="Reported User"
                      dataIndex="user"
                      key="user-name"
                      render={(nm) => (
                        <p>{nm["user"]["username"]}</p>

                      )}


                    />
                    {/* <Column title="Title" dataIndex="post" key="post-title" render={(nm) => (

                      <p>{nm['title']}</p>

                    )} />


                    <Column
                      title="Description"
                      dataIndex="post"
                      key="post-text"
                      render={(nm) => (

                        <p>{nm['text']}</p>

                      )}
                    /> */}
                    <Column title="Total Reports" dataIndex="totalReports" key="totalReports" />
                    {/* <Column
                      title="Tags"
                      dataIndex="tags"
                      key="tags"
                      render={(tags) => (
                        <>
                          {tags.map((tag) => (
                            <Tag color="blue" key={tag}>
                              {tag}
                            </Tag>
                          ))}
                        </>
                      )}
                    /> */}
                    <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        // <Space>
                        <div>
                          <Button style={{ marginRight: '20px' }} onClick={() => clearUserReps(record)} type="primary">Ignore</Button>

                          <Button onClick={() => disableRepUser(record)} type="primary" danger>Disable</Button>

                        </div>
                        // </Space>
                      )}
                    />
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab='Disabled Users' key='4' >
              <Row>
                <Col span={16}>
                  <Table dataSource={disabledUsers.length > 0 ? disabledUsers : []}>
                    <Column
                      title="Username"
                      dataIndex="user"
                      key="user-name"
                      render={(nm) => (
                        <p>{nm["username"]}</p>

                      )}

                    />
                    {/* <Column title="Title" dataIndex="post" key="post-title" render={(nm) => (

                      <p>{nm['title']}</p>

                    )} />

  */}
                    <Column
                      title="Cnic"
                      dataIndex="cnic"
                      key="cnic"
                    // render={(nm) => (

                    //   <p>{nm['text']}</p>

                    // )}
                    />

                    <Column title="Verified" dataIndex="verified" key="verified" render={(nm) => (
                      <p>{nm ? "yes" : "No"}</p>

                    )} />
                    {/* <Column
                      title="Tags"
                      dataIndex="tags"
                      key="tags"
                      render={(tags) => (
                        <>
                          {tags.map((tag) => (
                            <Tag color="blue" key={tag}>
                              {tag}
                            </Tag>
                          ))}
                        </>
                      )}
                    /> */}
                    <Column
                      title="Action"
                      key="action"

                      render={(text, record) => (
                        // <Space>
                        <div>
                          {/* {record.verified ? (<Button onClick={() => unVerUser(record)} type="primary" danger>Unverify</Button>) : (<Button style={{ marginRight: '20px' }} onClick={() => verUser(record)} type="primary">Verify</Button>)} */}
                          <Button type="primary" onClick={() => enableRepUser(record)}>Enable</Button>
                          {/* <Button style={{ marginRight: '20px' }} onClick={() => verUser(record)} type="primary">Verify</Button>

                          <Button onClick={() => unVerUser(record)} type="primary" danger>Unverify</Button> */}

                        </div>
                        // </Space>
                      )}
                    />
                  </Table>
                </Col>
              </Row>
            </TabPane>


            {/* <TabPane tab="Reported Post" key="4">
            Reported Posts ki list idhar daal dou
          </TabPane>
          <TabPane tab="Reported Post" key="5">
            Reported Posts ki list idhar daal dou
          </TabPane> */}
          </Tabs>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.profile.users,
  disabledUsers: state.profile.disabled,

  // posts: state.post.posts,
  // selectedPost: state.post.selectedPost,
  // deletedPost: state.post.deletedPost,
  reportedPosts: state.reportPostReducer.reportedPosts,
  reportedUsers: state.reportUserReducer.reportedUsers,


});

export default connect(mapStateToProps, {
  getAllReportedPosts,
  clearPostReports,
  deleteReportedPost,
  getAllReportedUsers,
  clearUserReports,
  setUser,
  getUser,
  getDisabledUsers,
  verifyUser,
  unverifyUser,
  enableUser,
  disableUser
  // getPost,
  // selectPost,
  // deletePostById,
  // addVolunteer,
})(Admin);
