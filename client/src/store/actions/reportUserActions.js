import {
  REPORT_USER,
  GET_ALL_REPORTED_USERS,
  GET_REPORTED_USERS_BY_USER_ID,
  CLEAR_USER_REPORTS,
} from "./types";
import {
  reportUser as _reportUser,
  getAllReportedUsers as _getAllReportedUsers,
  getReportedUserByUserId as _getReportedUserByUserId,
  clearUserReports as _clearUserReports
} from "../../API/reportUserAPI";

export const reportUser = (body) => (dispatch) => {
  _reportUser(body).then((res) => {
    dispatch({
      type: REPORT_USER,
      payload: res.data,
    });
  });
};

export const getAllReportedUsers = () => (dispatch) => {
  _getAllReportedUsers().then((res) => {
    dispatch({
      type: GET_ALL_REPORTED_USERS,
      payload: res.data,
    });
  });
};

export const clearUserReports = (id) => (dispatch) => {
  _clearUserReports(id).then((res) => {
    dispatch({
      type: CLEAR_USER_REPORTS,
      payload: res.data,
    });
  });
};

export const getReportedUserByUserId = (id) => (dispatch) => {
  _getReportedUserByUserId(id).then((res) => {
    dispatch({
      type: GET_REPORTED_USERS_BY_USER_ID,
      payload: res.data,
    });
  });
};
