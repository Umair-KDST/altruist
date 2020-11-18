import "./assets/styles/styles.scss";
import { connect } from "react-redux";
import CountUp from "react-countup";
import { login, setUser } from "../../store/actions/authActions";
import {
  getUserByUsername,
  addUserSkill,
} from "../../store/actions/userActions";

import { Redirect, Link } from "react-router-dom";
import { getUser } from "../../store/actions/userActions";
import React, { useEffect, useCallback, useState, Component } from "react";
import {
  Form,
  Button,
  Modal,
  Layout,
  Row,
  Col,
  Avatar,
  Comment,
  Badge,
} from "antd";
import { AutoComplete, Input, Tabs, Card, Spin } from "antd";

import {
  SearchOutlined,
  UserOutlined,
  PlusOutlined,
  CaretDownFilled,
  CaretUpFilled,
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleOutlined,
  WhatsAppOutlined
} from "@ant-design/icons";
import moment from "moment";
import FormBuilder from "antd-form-builder";
import Column from "antd/lib/table/Column";
import { getAllSkills } from "../../store/actions/skillActions";
import {
  getPostsByUserId,
  getVolunteeredPosts,
  selectPost,
  deletePostById,
  getPostById,
} from "../../store/actions/postActions";
import { reportUser } from "../../store/actions/reportUserActions";

import { addVolunteer } from "../../store/actions/volunteerActions";
import { Maps, PostCard, EditPost } from "../../components";
import { Tooltip } from "@material-ui/core";
import { ContactPhone } from "@material-ui/icons";

const { Content } = Layout;
const { TabPane } = Tabs;

const Profile = (props) => {
  const {
    user,
    getUserByUsername,
    getAllSkills,
    profile,
    allSkills,
    addUserSkill,
    getPostsByUserId,
    userPosts,
    getVolunteeredPosts,
    volunteeredPosts,
    selectPost,
    deletePostById,
    selectedPost,
    addVolunteer,
    getPostById,
    postById,
    reportUser,
  } = props;
  const [form] = FormBuilder.useForm();
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const [autoSkills, setAutoSkills] = useState([]);
  const [volPost, setVolPost] = useState([]);
  const [chosenPost, choosePost] = useState(null);

  const [personalInfo, setPersonalInfo] = useState(user.user);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const usnm = urlParams.get("u");
  const ps = urlParams.get("p");
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const search = window.location.search;
  const [usnmTemp, setUsnmTemp] = useState(usnm);
  const [psTemp, setPsTemp] = useState(ps);

  const [searchedSkill, setSearchedSkill] = useState("");

  useEffect(() => {
    console.log("windows search bar is showing", window.location);
    console.log("pathname is", window.location.pathname);
    if (
      (window.location.pathname === "/dashboard/profile/" ||
        window.location.pathname === "/dashboard/profile") &&
      !window.location.search
    ) {
      window.location.replace(
        origin + "/dashboard/profile/?u=" + user.username
      );
      console.log("redirect hoga");
    }
  }, []);

  useEffect(() => {
    getUserByUsername(usnm);
    getAllSkills();
    autoCompleteSkills();

    if (ps !== null) {
      console.log("ps in useEffect is ", ps);
      getPostById(ps);
    }
  }, []);

  useEffect(() => {
    if (usnmTemp !== usnm) {
      getUserByUsername(usnm);
      getAllSkills();
      autoCompleteSkills();
      setUsnmTemp(usnm);
    }

    if (psTemp !== ps && ps !== null) {
      getPostById(ps);
      setPsTemp(ps);
    }
    console.log("ps is ", ps);
  });

  useEffect(() => {
    autoCompleteSkills();
  }, [allSkills]);

  useEffect(() => {
    if (profile.length > 0) {
      getPostsByUserId(profile[0]._id);
      getVolunteeredPosts(profile[0]._id);

      // console.log('user posts loaded', posts)
    }
  }, [profile]);

  useEffect(() => {
    setVolPost(
      volunteeredPosts.map((post) => {
        return post["post"];
      })
    );
  }, [volunteeredPosts]);

  const autoCompleteSkills = () => {
    let op = [];

    allSkills.forEach((i) => {
      op.push({ value: i.name });
    });
    console.log("op is ", op);
    setAutoSkills(op);
  };

  const deletePost = (e) => {
    deletePostById(e._id);

    // console.log('DEletedPOst: ', deletedPost)
    getPostsByUserId(profile[0]._id);
    getVolunteeredPosts(profile[0]._id);
    getPostsByUserId(profile[0]._id);
    getVolunteeredPosts(profile[0]._id);
  };
  const volunteer = (e) => {
    console.log(e, " is volunteered");
    addVolunteer({ user_id: user.user._id, post_id: e._id });
    // getPost('')
    // getPost('')
    getPostsByUserId(profile[0]._id);
    getVolunteeredPosts(profile[0]._id);
    getPostsByUserId(profile[0]._id);
    getVolunteeredPosts(profile[0]._id);
  };

  const userPostSection = () => {
    return (
      <React.Fragment>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Col xl={10} lg={12} xs={ps ? 0 : 24}>
            {/* <h2>Posts By This User</h2> */}
            <Card title={<h2>Posts By This User</h2>}>
              <Col span={24} style={{ height: "70vh", overflowY: "scroll" }}>
                <h1>
                  {console.log('ps is ', ps)}
                  {userPosts.length ? (
                    userPosts.map((post, key) => {
                      return (
                        <Link
                          key={key}
                          to={pathname + "?u=" + usnm + "&" + "p=" + post._id}
                        >
                          <Col span={24} onMouseEnter={() => choosePost(post)}>
                            <PostCard
                              type="inner"
                              showComments={false}
                              showMap={false}
                              post={post}
                              volunteer={() => volunteer(chosenPost)}
                              deletePost={() => deletePost(chosenPost)}
                            />
                          </Col>
                        </Link>
                      );
                    })
                  ) : (
                      <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Spin />
                      </Col>
                    )}{" "}
                </h1>
              </Col>
            </Card>
          </Col>
          <Col xl={14} lg={12} xs={ps ? 24 : 0}>
            {console.log("user post ke maps", userPosts)}
            {postById.length > 0 && ps ? (
              <PostCard
                showComments={true}
                volunteer={() => volunteer(postById[0])}
                deletePost={() => deletePost(postById[0])}
                showMap={true}
                post={postById[0]}
                volunteer={() => volunteer(postById[0])}
              />
            ) : (
                <Maps
                  isMarkerShown
                  cor={Array.isArray(userPosts) ? userPosts : []}
                />
              )}
            {/* <Maps isMarkerShown cor={Array.isArray(userPosts) ? userPosts : []} /> */}
          </Col>
        </Col>
      </React.Fragment>
    );
  };

  const volunteeredPostSection = () => {
    return (
      <React.Fragment>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Col xl={10} lg={12} xs={ps ? 0 : 24}>
            <Card title={<h2>Posts Volunteered By This User</h2>}>
              <Col span={24} style={{ height: "70vh", overflowY: "scroll" }}>
                {console.log("volunteered Posts are", volunteeredPosts)}
                {volunteeredPosts.length > 0 ? (
                  volPost.map((post, key) => {
                    return (
                      <Link
                        key={key}
                        to={pathname + "?u=" + usnm + "&" + "p=" + post._id}
                      >
                        <Col span={24} onMouseEnter={() => choosePost(post)}>
                          <PostCard
                            type="inner"
                            showComments={false}
                            showMap={false}
                            post={post}
                            volunteer={() => volunteer(chosenPost)}
                            deletePost={() => deletePost(chosenPost)}
                          />
                        </Col>
                      </Link>
                    );
                  })
                ) : (
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Spin />
                    </Col>
                  )}
              </Col>
            </Card>
          </Col>
          <Col xl={14} lg={12} xs={ps ? 24 : 0}>
            {console.log("volunteered post ke maps", volunteeredPosts)}

            {console.log("posts for map are", volPost)}
            {/* <Maps isMarkerShown cor={Array.isArray(volPost) ? volPost : []} /> */}

            {postById.length > 0 && ps ? (
              <PostCard
                showComments={true}
                volunteer={() => volunteer(postById[0])}
                deletePost={() => deletePost(postById[0])}
                showMap={true}
                post={postById[0]}
                volunteer={() => volunteer(postById[0])}
              />
            ) : (
                <Maps isMarkerShown cor={Array.isArray(volPost) ? volPost : []} />
              )}
          </Col>
        </Col>
      </React.Fragment>
    );
  };
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
  let options = [
    { name: "Burns Bay Road" },
    { name: "Downing Street" },
    { name: "Wall Street" },
  ];

  const handleSelect = (value) => {
    setSearchedSkill(value);
    console.log("handle select ", value);
  };

  const handleSearch = (value) => {
    setSearchedSkill(value);

    console.log("handle search ", value);
  };

  const handleSearchClick = () => {
    console.log("searched query is :", searchedSkill);
    addUserSkill(user.user._id, { name: searchedSkill.trim().toLowerCase() });
  };

  const repUser = () => {
    console.log("user reported");
    reportUser({
      reporter_user_id: user.user._id,
      reported_user_id: profile[0]._id,
    });
    alert("User Reported!!");
  };

  const addSkillSection = () => {
    return (
      <Col
        span={24}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <AutoComplete
          style={{ width: 200 }}
          // options={allSkills ? allSkills : options}
          options={autoSkills.length ? autoSkills : []}
          placeholder="Add New Skill"
          filterOption={(inputValue, option) =>
            option.value
              .toUpperCase()
              .indexOf(inputValue.trim().toUpperCase()) !== -1
          }
          onSelect={handleSelect}
          onSearch={handleSearch}
        // onClick={(e) => { console.log(value) }}
        >
          <Input />
        </AutoComplete>
        <Button icon={<PlusOutlined />} onClick={handleSearchClick}>Add Skill
        </Button>
      </Col>
    );
  };

  const contactPhone = () => {
    window.open(`https://wa.me/${profile[0].phone}`, '_blank');
  }
  return (
    <Content>
      {profile[0] && profile[0].enabled &&
        <Row>
          {/* Profile Pic */}
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            {profile[0] && profile[0].profile_picture ? (
              <Avatar style={{}} size={164} src={profile[0].profile_picture} />
            ) : (
                <Avatar style={{}} size={164} icon={<UserOutlined />} />
              )}
          </Col>
          {/* Full Name */}
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <h1>
              {profile.length
                ? profile[0].name.firstName + " " + profile[0].name.lastName
                : ""}
            </h1>
            <p>
              {profile.length ? (
                profile[0].verified ? (
                  <CheckCircleOutlined />
                ) : (
                    ""
                  )
              ) : (
                  ""
                )}
            </p>
          </Col>
          {/* Address */}
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <h3>{profile.length ? profile[0].address : ""}</h3>
          </Col>
          {/* Add Skills */}
          {profile.length
            ? profile[0]._id === user.user._id
              ? addSkillSection()
              : null
            : null}
          {/* Skills Display */}
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <h4>Skills </h4>

            {profile.length
              ? profile.skills !== null &&
              profile[0].skills.map((skill) => {
                return <h4 key={`${skill._id}-skill`}> - {skill.name} </h4>;
              })
              : null}

            {console.log("Profile is", { profile })}
          </Col>

          {/* Stats */}
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <svg height="130" width="130">
              <circle
                cx="63"
                cy="63"
                r="60"
                stroke="black"
                stroke-width="3"
                fill="RGB(23, 162, 183)"
              />
              <text
                x="50%"
                y="50%"
                fill="white"
                stroke-width="3"
                text-anchor="middle"
                font-size="2em"
                dominant-baseline="middle"
              >
                {userPosts.length}
              </text>
              <text
                x="50%"
                y="70%"
                fill="white"
                stroke-width="1.5"
                text-anchor="middle"
                font-size="1em"
                dominant-baseline="middle"
              >
                Posted
            </text>
            </svg>
            <svg height="130" width="130">
              <circle
                cx="63"
                cy="63"
                r="60"
                stroke="black"
                stroke-width="3"
                fill="RGB(23, 162, 183)"
              />
              <text
                x="50%"
                y="50%"
                fill="white"
                stroke-width="3"
                text-anchor="middle"
                font-size="2em"
                dominant-baseline="middle"
              >
                {volPost.length}
              </text>
              <text
                x="50%"
                y="70%"
                fill="white"
                stroke-width="1.5"
                text-anchor="middle"
                font-size="1em"
                dominant-baseline="middle"
              >
                Volunteered
            </text>
            </svg>
          </Col>

          {/* Report User */}
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Button danger onClick={() => repUser()}>
              {" "}
            Report
          </Button>
            <Tooltip title={profile.length ? profile[0].phone : 'Contact'}>
              <Button onClick={() => contactPhone()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={<WhatsAppOutlined />} shape='circle'>

              </Button>
            </Tooltip>
          </Col>

          {/* posts */}
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              style={{ marginLeft: "15px", marginRight: "15px" }}
            >
              <TabPane
                tab={
                  <Link to={pathname + "?u=" + usnm}>
                    <h5
                      onClick={() => {
                        selectPost(null);
                      }}
                    >
                      Posts By This User
                  </h5>
                  </Link>
                }
                key="1"
              >
                {userPostSection()}
              </TabPane>
              <TabPane
                tab={
                  <Link to={pathname + "?u=" + usnm}>
                    <h5
                      onClick={() => {
                        selectPost(null);
                      }}
                    >
                      Posts Volunteered By This User
                  </h5>
                  </Link>
                }
                key="2"
              >
                {volunteeredPostSection()}
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      }

      {profile[0] && !profile[0].enabled &&

        <Row>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }} >
            <h1>This User has been Disabled</h1>
          </Col>
        </Row>
      }


    </Content>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,
  allSkills: state.skill.skills,
  userPosts: state.post.userPosts,
  volunteeredPosts: state.post.volunteeredPosts,
  selectedPost: state.post.selectedPost,
  postById: state.post.post,
});

export default connect(mapStateToProps, {
  getUserByUsername,
  getAllSkills,
  addUserSkill,
  getPostsByUserId,
  getVolunteeredPosts,
  selectPost,
  deletePostById,
  addVolunteer,
  getPostById,
  reportUser,
})(Profile);
