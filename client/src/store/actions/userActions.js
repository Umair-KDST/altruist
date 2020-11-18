import {
  GETUSER,
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME,
  ADD_USER_SKILL,
  VERIFY_USER,
  UNVERIFY_USER,
  GET_DISABLED_USERS,
  ENABLE_USER,
  DISABLE_USER
} from "./types";
import {
  getUser as _getUser,
  getUserById as _getUserById,
  addUserSkill as _addUserSkill,
  verifyUser as _verifyUser,
  unverifyUser as _unverifyUser,
  getDisabledUsers as _getDisabledUsers,
  enableUser as _enableUser,
  disableUser as _disableUser,
  getUserByUsername as _getUserByUsername,
} from "../../API/userAPI";

export const getUser = () => (dispatch) => {
  _getUser().then((res) => {
    dispatch({
      type: GETUSER,
      payload: res.data,
    });
  });
};

export const getDisabledUsers = () => (dispatch) => {
  _getDisabledUsers().then((res) => {
    dispatch({
      type: GET_DISABLED_USERS,
      payload: res.data,
    });
  });
};

export const getUserById = (id) => (dispatch) => {
  _getUserById(id).then((res) => {
    dispatch({
      type: GET_USER_BY_ID,
      payload: res.data,
    });
  });
};

export const getUserByUsername = (username) => (dispatch) => {
  _getUserByUsername(username).then((res) => {
    dispatch({
      type: GET_USER_BY_USERNAME,
      payload: res.data,
    });
  });
};

export const addUserSkill = (id, body) => (dispatch) => {
  _addUserSkill(id, body).then((res) => {
    dispatch({
      type: ADD_USER_SKILL,
      payload: res.data,
    });
  });
};

export const verifyUser = (body) => (dispatch) => {
  _verifyUser(body).then((res) => {
    dispatch({
      type: VERIFY_USER,
      payload: res.data,
    });
  });
};

export const unverifyUser = (body) => (dispatch) => {
  _unverifyUser(body).then((res) => {
    dispatch({
      type: UNVERIFY_USER,
      payload: res.data,
    });
  });
};

export const enableUser = (body) => (dispatch) => {
  _enableUser(body).then((res) => {
    dispatch({
      type: ENABLE_USER,
      payload: res.data,
    });
  });
};

export const disableUser = (body) => (dispatch) => {
  _disableUser(body).then((res) => {
    dispatch({
      type: DISABLE_USER,
      payload: res.data,
    });
  });
};
