import {
  LOGIN,
  SIGNUP,
  SETUSER,
  LOGIN_FAILED,
  ENABLE_USER,
  DISABLE_USER,
} from "./types";
import {
  login as signIn,
  signUp as _signUp,
  enableUser as _enableUser,
  disableUser as _disableUser,
} from "../../API/authAPI";

export const login = (username, password) => (dispatch) => {
  signIn(username, password)
    .then((user) =>
      dispatch({
        type: LOGIN,
        payload: user.data,
      })
    )
    .catch((e) =>
      dispatch({
        type: LOGIN_FAILED,
        payload: e.response ? e.response.data : "The Server is Down",
      })
    );
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  // console.log('test')
  dispatch({
    type: SETUSER,
    payload: null,
  });
};

export const setUser = () => (dispatch) => {
  dispatch({
    type: SETUSER,
    payload: JSON.parse(localStorage.getItem("user")),
  });
};

export const signUp = (body) => (dispatch) => {
  _signUp(body)
    .then((user) => {
      dispatch({
        type: LOGIN,
        payload: user.data,
      });
    })
    .catch((e) =>
      dispatch({
        type: LOGIN_FAILED,
        payload: e.response
          ? e.response.data.message
            ? e.response.data.message
            : e.response.data
          : "The Server is Down",
      })
    );
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
