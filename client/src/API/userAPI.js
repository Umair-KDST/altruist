import { PROFILE_URL } from "./apiURL";
import axios from "axios";

export const getUser = () => {
  return axios.get(PROFILE_URL);
};

export const getDisabledUsers = () => {
  return axios.get(`${PROFILE_URL}/get/getDisabledUsers`);
};

export const getUserById = (id) => {
  return axios.get(`${PROFILE_URL}/${id}/getUserById`);
};

export const addUserSkill = (id, body) => {
  return axios.post(`${PROFILE_URL}/${id}/skill`, body);
};

export const getUserByUsername = (username) => {
  return axios.get(`${PROFILE_URL}/${username}`);
};

export const verifyUser = (body) => {
  return axios.put(`${PROFILE_URL}/verify`, body);
};

export const unverifyUser = (body) => {
  return axios.put(`${PROFILE_URL}/unverify`, body);
};

export const enableUser = (body) => {
  return axios.put(`${PROFILE_URL}/enable`, body);
};

export const disableUser = (body) => {
  return axios.put(`${PROFILE_URL}/disable`, body);
};
