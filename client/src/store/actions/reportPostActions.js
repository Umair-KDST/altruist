import {
  REPORT_POST,
  GET_ALL_REPORTED_POSTS,
  GET_REPORTED_POSTS_BY_USER_ID,
  CLEAR_POST_REPORTS,
  DELETE_REPORTED_POST,
} from "./types";
import {
  reportPost as _reportPost,
  getAllReportedPosts as _getAllReportedPosts,
  getReportedPostByUserId as _getReportedPostByUserId,
  clearPostReports as _clearPostReports,
  deleteReportedPost as _deleteReportedPost,
} from "../../API/reportPostAPI";

export const reportPost = (body) => (dispatch) => {
  _reportPost(body).then((res) => {
    dispatch({
      type: REPORT_POST,
      payload: res.data,
    });
  });
};

export const getAllReportedPosts = () => (dispatch) => {
  _getAllReportedPosts().then((res) => {
    dispatch({
      type: GET_ALL_REPORTED_POSTS,
      payload: res.data,
    });
  });
};

export const getReportedPostByUserId = (id) => (dispatch) => {
  _getReportedPostByUserId(id).then((res) => {
    dispatch({
      type: GET_REPORTED_POSTS_BY_USER_ID,
      payload: res.data,
    });
  });
};


export const clearPostReports = (id) => (dispatch) => {
  _clearPostReports(id).then((res) => {
    dispatch({
      type: CLEAR_POST_REPORTS,
      payload: res.data,
    });
  });
};

export const deleteReportedPost = (id) => (dispatch) => {
  _deleteReportedPost(id).then((res) => {
    dispatch({
      type: DELETE_REPORTED_POST,
      payload: res.data,
    });
  });
};