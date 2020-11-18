import React, { useState, createElement } from "react";
import { connect } from "react-redux";
import {
  Card,
  Comment,
  Tooltip,
  Avatar,
  Typography,
  Form,
  Input,
  Button,
  Collapse,
} from "antd";
import { Maps, UpdatePost, NewPost } from "../../components";

import {
  UserOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  CaretDownFilled,
  CaretUpFilled,
  CaretDownOutlined,
  CaretUpOutlined,
  LikeOutlined,
  StopOutlined,
  DislikeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  getPostById,
  deletePostById,
  selectPost,
} from "../../store/actions/postActions";

import {
  addComment,
  getCommentsByPostId,
  addReply,
  deleteCommentById,
} from "../../store/actions/commentActions";
import { reportPost } from "../../store/actions/reportPostActions";
import { Route, Link } from "react-router-dom";
import { getUserById } from "../../store/actions/userActions";

const { TextArea } = Input;
const { Title } = Typography;
const { Panel } = Collapse;

const PostCard = ({
  getPostById,
  deletePost,
  selectPost,
  post,
  selectedPost,
  addReply,
  addComment,
  deleteCommentById,
  user,
  getUserById,
  deletePostById,
  profile,
  volunteer,
  showComments,
  showMap,
  type,
  getCommentsByPostId,
  postcomments,
  reportPost,
}) => {
  const [action, setAction] = useState(null);
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  const [volunteered, setVolunteered] = useState(
    post.PostVolunteers.filter((v) => {
      return v.user_id == user.user._id;
    }).length
  );
  const [volunteers, setVolunteers] = useState(post.PostVolunteers.length);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  // const [totalVolunteers, setTotalVolunteers] = useState(post.volunteers.length);
  const [activeComment, setActiveComment] = useState(null);
  // const [postToDelete, setPostToDelete] = useState(null);

  React.useEffect(() => {
    // setTotalVolunteers(post.volunteers.length)
    setVolunteers(post.PostVolunteers.length);
    setVolunteered(
      post.PostVolunteers.filter((v) => {
        return v.user_id == user.user._id;
      }).length
    );
  }, [post]);

  React.useEffect(() => {
    if (showComments) {
      getCommentsByPostId(post._id);
    }
  }, [post]);

  const editPost = () => {
    // setLikes(1);
    // setDislikes(0);
    // setAction("liked");
    if (post.user_id === user.user._id) {
      selectPost(post);
      console.log("edit honey wali post ", selectedPost);
    } else {
      {
        alert("Can't edit this post");
      }

      // window.history.back()
    }
  };

  const delComment = (e) => {
    if (e.user_id === user.user._id || post.user_id === user.user._id) {
      deleteCommentById(e._id);
      console.log("delComment ", e);
      alert("Comment/Reply Deleted");
    } else {
      alert("You are not allowed to delete other's Comments Or Replies");
    }
  };
  const delPost = () => {
    if (post.user_id === user.user._id) {
      deletePost();
      console.log("post deleted", post);
      alert("Post Deleted");
    } else {
      alert("You are not allowed to delete other's post");
    }
  };
  const volunteerPost = () => {
    if (!volunteered) {
      volunteer();
      setVolunteered(1);
      setVolunteers(volunteers + 1);
      getPostById(post._id);
    }
  };

  const repPost = () => {
    reportPost({ user_id: user.user._id, post_id: post._id });
    alert("You Reported This Post !!");
  };
  const commentPost = () => {
    return (
      addComment({ post_id: post._id, user_id: user.user._id, text: comment }),
      setComment(""),
      checkComment(),
      checkComment()
    );
  };
  const replyComment = (e) => {
    // addReply(e._id, { user_id: user.user._id, text: reply })
    addComment({
      post_id: post._id,
      user_id: user.user._id,
      text: reply,
      parent_id: e._id,
    });
    setReply("");
    checkComment();
  };
  const checkComment = () => {
    console.log("API hit hori hai postcomments ki ", postcomments);
    getCommentsByPostId(post._id);
    getPostById(post._id);
  };
  // const volunteer = () => {

  //   console.log('volunterr in postcard ', props)
  //   props.volunteer();
  //   // console.log('Ni hua volunteer')
  // };

  // const delAction = [
  //   <span key={`Delete`} className="mx-1">

  //     <Tooltip title="Delete">
  //       {React.createElement(
  //         DeleteOutlined,
  //         {
  //           onClick: (e) => delComment(e)
  //         }
  //       )}
  //     </Tooltip>
  //   </span>
  // ]
  const actions = [


    <span key={`${post._id}-like`} style={{ display: (post.user_id === user.user._id) ? '' : 'none' }}>
      {post.user_id === user.user._id &&
        <>
          <Link to="/dashboard/editPost">
            <Tooltip title="Edit">
              {createElement(action === "liked" ? EditOutlined : EditOutlined, {
                onClick: editPost,
              })}
            </Tooltip>
          </Link>
          <span className="comment-action mr-1"></span>
        </>
      }
    </span>,
    <span key={`${post._id}-delete`} className="mx-1" style={{ display: (post.user_id === user.user._id) ? '' : 'none' }}>
      {post.user_id === user.user._id &&
        <Tooltip title="Delete">
          {React.createElement(DeleteOutlined, {
            onClick: delPost,
          })}
        </Tooltip>
      }
    </span>,

    <span key={`${post._id}-volunteer`} className="mx-1">

      <Tooltip title="Volunteer">
        {React.createElement(
          volunteered ? CaretDownOutlined : CaretUpOutlined,
          {
            onClick: volunteerPost,
          }
        )}
      </Tooltip>

      <span className="comment-action ">{volunteers}</span>
    </span>,
    <span key={`${post._id}-report`} className="mx-1">
      {post.user_id !== user.user._id &&
        <Tooltip title="Report">
          {React.createElement(StopOutlined, {
            onClick: repPost,
          })}
        </Tooltip>}
    </span>,


  ];

  const commentSection = () => {
    console.log("commentSection called");

    return (
      <React.Fragment>
        <Button type="link" onClick={() => checkComment()}>
          Refresh
        </Button>
        <Collapse>
          <Panel header="View Volunteers">
            {post.PostVolunteers.length > 0 ?
              post.PostVolunteers.map((_volunteer) => {
                return (
                  <Comment
                    key={`${_volunteer._id}-volunteer`}
                    // author={_volunteer.username }
                    author={
                      <Link to={`/dashboard/profile/?u=${_volunteer.username}`}>
                        {_volunteer.username}
                      </Link>
                    }
                    avatar={
                      <Avatar
                        src="https://getdrawings.com/free-icon-bw/generic-user-icon-9.png"
                        // src={_volunteer.user.profile_picture}
                        alt="Han Solo"
                      />
                    }
                  ></Comment>
                );
              }) : <p>No Volunteers</p>}
          </Panel>
          <Panel header="View Comments">
            {postcomments.length > 0 ?
              postcomments
                .filter((cm) => {
                  return cm.parent_id === null;
                })
                .map((_comment) => {
                  return (
                    <Comment
                      key={`${_comment._id}-comment`}
                      // author={_comment.user.username}
                      author={
                        <Link
                          to={`/dashboard/profile/?u=${_comment.user.username}`}
                        >
                          {_comment.user.username}
                        </Link>
                      }
                      avatar={
                        <Avatar
                          // src="https://getdrawings.com/free-icon-bw/generic-user-icon-9.png"
                          src={_comment.user.profile ? _comment.user.profile.profile_picture : user.user.profile_picture}
                          alt="Han Solo"
                        />
                      }
                      content={
                        <p>
                          {_comment.text} ---
                        <Button
                            type="link"
                            onClick={() => delComment(_comment)}
                          >
                            Delete
                        </Button>
                        </p>
                      }
                      datetime={_comment.date}
                      style={{ padding: "0px" }}
                    >
                      {postcomments
                        .filter((cm) => {
                          return cm.parent_id === _comment._id;
                        })
                        .map((_reply) => {
                          return (
                            <Comment
                              key={`${_reply._id}-reply`}
                              // author={_reply.user.username}
                              author={
                                <Link
                                  to={`/dashboard/profile/?u=${_reply.user.username}`}
                                >
                                  {_reply.user.username}
                                </Link>
                              }
                              avatar={
                                <Avatar
                                  src={_reply.user.profile ? _reply.user.profile.profile_picture : user.user.profile_picture}
                                  // src="https://getdrawings.com/free-icon-bw/generic-user-icon-9.png"
                                  alt="Han Solo"
                                />
                              }
                              content={
                                <p>
                                  {_reply.text} ---
                                <Button
                                    type="link"
                                    onClick={() => delComment(_reply)}
                                  >
                                    Delete
                                </Button>
                                </p>
                              }
                              datetime={_reply.date}
                            />
                          );
                        })}
                      <Comment
                        content={
                          <div>
                            <Form.Item>
                              <TextArea
                                rows={2}
                                allowClear="true"
                                onChange={(e) => {
                                  setReply(e.target.value);
                                }}
                                onClick={() => {
                                  setReply("");
                                  setActiveComment(_comment._id);
                                }}
                                placeholder="Reply"
                                value={activeComment === _comment._id && reply}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                htmlType="submit"
                                onClick={() => replyComment(_comment)}
                                type="primary"
                              >
                                Reply
                            </Button>
                            </Form.Item>
                          </div>
                        }
                      />
                    </Comment>
                  );
                }) : <p>No Comments</p>}
          </Panel>
        </Collapse>

        <Comment
          content={
            <div>
              <Form.Item>
                <TextArea
                  rows={2}
                  allowClear="true"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder="Add a comment"
                  value={comment}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  onClick={() => commentPost()}
                  type="primary"
                >
                  Add Comment
                </Button>
              </Form.Item>
            </div>
          }
        />

        {/* <Route path="/dashboard/newpost" component={<NewPost postType='Update' />} /> */}
      </React.Fragment>
    );
  };

  const mapSection = [
    <div key={`${post._id}-Map`} style={{ height: "300px", width: "100%" }}>
      <Maps isMarkerShown cor={[post]} />
    </div>,
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Card
        type={type}
        style={{ width: "100%", height: "50%", }}
        headStyle={{ backgroundColor: "RGB(23, 162, 183)" }}
        title={<h6 style={{ color: "white" }}>{post.title}</h6>}
      >
        <Comment

          actions={actions}
          // author={post.user.username ? post.user.username : user.username}
          author={
            post.user.username ? (
              <Link to={`/dashboard/profile/?u=${post.user.username}`}>
                {post.user.username}
              </Link>
            ) : (
                <Link to={`/dashboard/profile/?u=${user.username}`}>
                  {user.username}
                </Link>
              )
          }
          content={<div> <p style={{ fontSize: '16px', color: 'black', fontWeight: '500' }}>{post.text}</p>
            <hr></hr>
            <strong>
              <p>Skills required</p>
            </strong>
            {post.postSkills.length > 0 ?
              <div style={{ display: 'flex' }}>
                {post.postSkills.map((_skill) => {
                  return <p>{_skill.name}--</p>
                })}
              </div>
              :
              <div> <p>No SKills Required</p></div>
            }

          </div>
          }
          datetime={post.date}
          avatar={
            <Avatar
              src={post.user.profile ? post.user.profile.profile_picture : user.user.profile_picture}
              alt="Han Solo"
            />
          }
        />

        {showComments && commentSection()}
      </Card>

      {showMap && mapSection}
      {/* <Route path="/dashboard/updatePost"
        // component={UpdatePost}
        render={(props) => (<UpdatePost {...props} isAuthed={true} />)}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  postcomments: state.comment.postComments,
  selectedPost: state.post.selectedPost,

  profile: state.profile.profile,
});

export default connect(mapStateToProps, {
  addComment,
  selectPost,
  addReply,
  getPostById,
  getUserById,
  deletePostById,
  getCommentsByPostId,
  deleteCommentById,
  reportPost,
})(PostCard);
