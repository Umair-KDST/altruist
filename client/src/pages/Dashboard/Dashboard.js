import React, { useEffect, useState, createElement } from "react";
import { connect } from "react-redux";
import { Layout, Row, Col, Card, Tooltip, Comment, Avatar } from "antd";
import { Maps, PostCard, EditPost } from "../../components";
import { Route, Switch, Link } from "react-router-dom";
import { getPost, selectPost, deletePostById, getPostById } from "../../store/actions/postActions";
import { addVolunteer } from "../../store/actions/volunteerActions";



import {
  UserOutlined,
  CaretDownFilled,
  CaretUpFilled,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";


const { Content } = Layout;

const Dashboard = ({ getPost, posts, selectPost, selectedPost, user, deletePostById, deletedPost, addVolunteer, getPostById, postById }) => {
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  // const [volunteers, setvolunteers] = useState(0);
  // const [action, setAction] = useState(null);
  const [chosenPost, choosePost] = useState(null);
  const kh = ''

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ps = urlParams.get("p");
  const origin = window.location.origin;
  const [psTemp, setPsTemp] = useState(ps);


  useEffect(() => {



  }, [])

  useEffect(() => {
    if (!posts.length) {
      getPost(kh);
    }
  }, [posts]);

  useEffect(() => {

    if (ps !== null) {
      console.log('ps in useEffect is ', ps)
      getPostById(ps)
    }
  }, [])



  useEffect(() => {
    if (psTemp !== ps) {
      getPostById(ps)
      setPsTemp(ps)
    }

  });



  // const like = () => {
  //   setLikes(1);
  //   setDislikes(0);
  //   setAction("liked");
  // };

  // const dislike = () => {
  //   setLikes(0);
  //   setDislikes(1);
  //   setAction("disliked");
  // };

  const deletePost = (e) => {
    deletePostById(e._id)
    getPostById(ps)
    console.log('DEletedPOst: ', deletedPost)
  };

  const selectThePost = (e) => {
    // selectPost(e)
    window.location.replace(origin + '/dashboard/?p=' + e._id)
  }



  const volunteer = (e) => {
    console.log(e, ' is volunteered')
    addVolunteer({ user_id: user.user._id, post_id: e._id })
    getPost('')
    getPost('')
    // console.log(e.volunteers)
    // addVolunteer(e._id, { user_id: user.user._id }).then(res => console.log(res.data))
    // let len = e.volunteers.filter((v) => { return v.user == user.user._id; })
    // console.log(len.length)
    // // let c=e.volunteers.filter((p)=>{p._id})
    // console.log('Hogya volunteer', user.user._id)
  };

  // const actions = [
  //   <span key="comment-basic-like" className="mx-1">
  //     <Tooltip title="Like">
  //       {createElement(action === "liked" ? CaretUpFilled : CaretUpOutlined, {
  //         onClick: like,
  //       })}
  //     </Tooltip>
  //     <span className="comment-action mr-2">{likes}</span>
  //   </span>,
  //   <span key=' key="comment-basic-dislike"' className="">
  //     <Tooltip title="Dislike">
  //       {React.createElement(
  //         action === "disliked" ? CaretDownFilled : CaretDownOutlined,
  //         {
  //           onClick: dislike,
  //         }
  //       )}
  //     </Tooltip>
  //     <span className="comment-action ml-2">{dislikes}</span>
  //   </span>,
  //   <span key='key="comment-basic-dislike"' className="mx-3">
  //     <Tooltip title="Volunteer">
  //       {React.createElement(
  //         action === "volunteered" ? UserOutlined : UserOutlined,
  //         {
  //           onClick: () => volunteer(chosenPost),
  //         }
  //       )}
  //     </Tooltip>
  //     {/* <span className="comment-action ml-2">{volunteers}</span> */}
  //   </span>,
  // ];

  return (

    <Content style={{ margin: "0 16px", padding: "0px 16px" }}>
      {/* {console.log('selectedpost is ', selectedPost)}
      {console.log('DEletedPOst: ', deletedPost)} */}

      <Row className="mt-5" style={{ overflowY: "scroll", height: "100vh" }}>
        <Col xl={10} lg={10} xs={postById.length > 0 ? 0 : 24} className="bg-white" >

          <Card style={{}} title={"Posts       ( " + posts.length + " )"} >
            <div style={{ overflowY: 'scroll', height: "800px" }}>
              {/* {console.log('ps is is ', ps)} */}
              {console.log('logged in is ', user)}
              {posts.length > 0 ? (
                posts.map((post, key) => {
                  return (

                    <Link key={key} to={'/dashboard/?p=' + post._id}>
                      <Col span={24} onMouseEnter={() => choosePost(post)}>

                        <PostCard type='inner' showComments={false} volunteer={() => volunteer(chosenPost)} deletePost={() => deletePost(chosenPost)} showMap={false} post={post} volunteer={() => volunteer(chosenPost)} />
                      </Col>
                    </Link>
                  );
                })
              ) : (
                  <React.Fragment />
                )}
            </div>
          </Card>

        </Col>
        <Col xl={14} lg={14} xs={(postById.length > 0) ? 24 : 0}>
          {console.log("post by id is ", postById)}
          {postById.length > 0 ? (
            // window.location.replace(origin + '/dashboard/?p=' + selectedPost._id),
            // console.log('id of selected post is', selectedPost._id),
            // console.log('ps is ', ps),
            <PostCard showComments={true} volunteer={() => volunteer(postById[0])} deletePost={() => deletePost(postById[0])} showMap={true} post={postById[0]} volunteer={() => volunteer(postById[0])} />
          ) : (
              // console.log('selected post in maps is', selectedPost),
              <Maps isMarkerShown cor={Array.isArray(posts) ? posts : []} />
            )}
        </Col>
      </Row>
      <Route exact path="/dashboard/editPost"
        component={EditPost}
      // render={(props) => (<UpdatePost {...props} isAuthed={true} />)}
      />
    </Content>

  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  posts: state.post.posts,
  postById: state.post.post,
  selectedPost: state.post.selectedPost,
  deletedPost: state.post.deletedPost,
});

export default connect(mapStateToProps, { getPost, selectPost, deletePostById, addVolunteer, getPostById })(Dashboard);
