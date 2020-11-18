import axios from "axios";
import { LOGIN_URL, SINGUP_URL } from "./apiURL";

export const login = (username, password) => {
  return axios.post(LOGIN_URL, { username, password });
};

export const signUp = (body) => {
  return axios.post(SINGUP_URL, body);
};

export const enableUser = (body) => {
  return axios.put(`${SINGUP_URL}/enable`, body);
};

export const disableUser = (body) => {
  return axios.put(`${SINGUP_URL}/disable`, body);
};
