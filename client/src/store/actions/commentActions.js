import { ADD_COMMENT, GET_ALL_COMMENTS, GET_COMMENTS_BY_POST_ID, ADD_REPLY, DELETE_COMMENT_BY_ID } from "./types";
import {
    getAllComments as _getAllComments,
    addComment as _addComment,
    getCommentsByPostId as _getCommentsByPostId,
    addReply as _addReply,
    deleteCommentById as _deleteCommentById

} from "../../API/commentAPI";

export const getAllComments = () => (dispatch) => {
    _getAllComments().then((res) => {
        dispatch({
            type: GET_ALL_COMMENTS,
            payload: res.data,
        });
    });
};

export const addComment = (body, goBack) => (dispatch) => {
    _addComment(body).then((res) => {
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
    })
    // .then(() => {
    //     // goBack();
    //     console.log("goBack() called")
    // })
}

export const addReply = (id, body) => dispatch => {
    _addReply(id, body).then(res => {
        dispatch({
            type: ADD_REPLY,
            payload: res.data
        })
    })
}


export const getCommentsByPostId = (id) => dispatch => {
    _getCommentsByPostId(id).then(res => {
        dispatch({
            type: GET_COMMENTS_BY_POST_ID,
            payload: res.data
        })
    })
}
export const deleteCommentById = (id) => dispatch => {
    _deleteCommentById(id).then(res => {
        dispatch({
            type: DELETE_COMMENT_BY_ID,
            payload: res.data
        })
    })
}