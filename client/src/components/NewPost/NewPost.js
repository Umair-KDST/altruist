import React, { useState, useEffect } from "react";
import { DynamicForm } from "../../components";
import { Modal, Form } from "antd";
import { Maps } from "../../components";
import { connect } from 'react-redux';
import { puslish } from '../../store/actions/postActions';

const NewPost = (props) => {
  useEffect(() => {
    if (!post.lat || !post.long) {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position) => {
          setPost({
            ...post,
            long: position.coords.longitude,
            lat: position.coords.latitude,
          });

        });
      } else {
        alert("Can't get Location");
      }
    }
  }, []);


  const [post, setPost] = useState({
    user_id: props.user.user._id,
    title: "",
    text: "",
    // long: null,
    // lat: null,
    skills: [],
  });

  // const [title, setTitle] = useState(props.postType)

  const script = [
    [
      {
        type: "text",
        data: post.title,
        lg: 24,
        placeholder: "Title",
        onChange: (e) => {
          setPost({
            ...post,
            title: e.target.value,
          });
        },
      },
    ],
    [
      {
        type: "textarea",
        data: post.text,
        lg: 24,
        placeholder: "Description",
        onChange: (e) => {
          setPost({
            ...post,
            text: e.target.value,
          });
        },
      },
    ],

    [
      {
        type: "text",
        data: post.lat,
        lg: 24,
        placeholder: "Latitude",
        onChange: (e) => {
          setPost({
            ...post,
            lat: e.target.value,
          });
        },
      },
    ],
    [
      {
        type: "text",
        data: post.long,
        lg: 24,
        placeholder: "Longitude",
        onChange: (e) => {
          setPost({
            ...post,
            long: e.target.value,
          });
        },
      },
    ],
    [
      {
        type: "text",
        data: post.skills,
        lg: 24,
        placeholder: "Type required skill with comma (,) separators",
        onChange: (e) => {
          setPost({
            ...post,
            skills: e.target.value.toLowerCase().split(','),
          });
        },
      },
    ],

  ];

  return (
    <Modal
      title='New Post'
      centered
      width="80vw"
      visible={true}
      okText={"Publish"}
      onOk={() => {
        props.puslish(post, () => props.history.goBack())
      }}
      onCancel={() => props.history.goBack()}
    >
      {console.log("props are ", props)}
      <Form size={"large"} layout="vertical">
        <DynamicForm script={script} />

        <div style={{ height: "30vh", width: "100%" }}>
          <Maps isMarkerShown cor={[post]} />
        </div>
      </Form>
    </Modal>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { puslish })(NewPost);
