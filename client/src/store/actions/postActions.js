import {
  GET_ALL_POSTS,
  PUBLISH,
  GET_POST_BY_ID,
  DELETE_POST_BY_ID,
  EDIT_POST_BY_ID,
  GET_POSTS_BY_USER_ID,
  GET_VOLUNTEERED_POSTS,
  SELECT_POST,
} from "./types";
import {
  getPost as _getPost,
  puslish as _puslish,
  addComment as _addComment,
  getPostById as _getPostById,
  addVolunteer as _addVolunteer,
  deletePostById as _deletePostById,
  editPostById as _editPostById,
  getPostsByUserId as _getPostsByUserId,
  getVolunteeredPosts as _getVolunteeredPosts,
} from "../../API/postAPI";

export const getPost = (query) => (dispatch) => {
  _getPost(query).then((res) => {
    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data,
    });
  });
};

export const puslish = (body, goBack) => (dispatch) => {
  _puslish(body)
    .then((res) => {
      dispatch({
        type: PUBLISH,
        payload: res.data,
      });
    })
    .then(() => {
      goBack();
    });
};

// export const addComment = (id, body) => dispatch => {
//   _addComment(id, body).then(res => {
//     dispatch({
//       type: ADD_COMMENT,
//       payload: res.data
//     })
//   })
// }

// export const addVolunteer = (id, body) => dispatch => {
//   _addVolunteer(id, body).then(res => {
//     dispatch({
//       type: ADD_VOLUNTEER,
//       payload: res.data
//     })
//   })
// }

export const getPostById = (id) => (dispatch) => {
  _getPostById(id).then((res) => {
    dispatch({
      type: GET_POST_BY_ID,
      payload: res.data,
    });
  });
};

export const getPostsByUserId = (id) => (dispatch) => {
  _getPostsByUserId(id).then((res) => {
    dispatch({
      type: GET_POSTS_BY_USER_ID,
      payload: res.data,
    });
  });
};

export const getVolunteeredPosts = (id) => (dispatch) => {
  _getVolunteeredPosts(id).then((res) => {
    dispatch({
      type: GET_VOLUNTEERED_POSTS,
      payload: res.data,
    });
  });
};

export const deletePostById = (id) => (dispatch) => {
  _deletePostById(id).then((res) => {
    dispatch({
      type: DELETE_POST_BY_ID,
      payload: res.data,
    });
  });
};

export const editPostById = (id, body, goBack) => (dispatch) => {
  _editPostById(id, body)
    .then((res) => {
      dispatch({
        type: EDIT_POST_BY_ID,
        payload: res.data,
      });
    })
    .then(() => {
      goBack();
    });
};

export const selectPost = (post) => (dispatch) => {
  dispatch({
    type: SELECT_POST,
    payload: post,
  });
};
