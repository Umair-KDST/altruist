import React, { useState, useEffect } from "react";
import { DynamicForm } from "..";
import { Modal, Form } from "antd";
import { Maps } from "..";
import { connect } from 'react-redux';
import { editPostById } from '../../store/actions/postActions';

const UpdatePost = (props) => {
    { console.log('selected post to edit ', props.selectedPost) }

    const [post, setPost] = useState({
        user_id: props.user.user._id,
        title: props.selectedPost.title,
        text: props.selectedPost.text,
        long: props.selectedPost.long,
        lat: props.selectedPost.lat,
        skills: props.selectedPost.postSkills.map((skill) => { return skill['name'] }),
    });


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
            title='Edit Post'
            centered
            width="80vw"
            visible={true}
            okText={"Publish"}
            onOk={() => {
                if (props.selectedPost.user_id === props.user.user._id) {
                    props.editPostById(props.selectedPost._id, post, () => props.history.goBack())
                }
                else {
                    alert('You are not authorized to edit this post')
                }
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
        // <h1>UpdatePost</h1>
    );
}
const mapStateToProps = state => ({
    user: state.auth.user,
    selectedPost: state.post.selectedPost,
})
export default connect(mapStateToProps, { editPostById })(UpdatePost);
