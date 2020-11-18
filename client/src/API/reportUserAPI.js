import { REPORT_USER_URL } from "./apiURL";
import axios from "axios";

export const getAllReportedUsers = () => {
  return axios.get(REPORT_USER_URL);
};

export const reportUser = (body) => {
  return axios.post(REPORT_USER_URL, body);
};

export const getReportedUserByUserId = (id) => {
  // return axios.get(`${REPORT_USER_URL}/${id}`)
  return axios.get(`${REPORT_USER_URL}/${id}`);
};

export const clearUserReports = (id) => {
  return axios.get(`${REPORT_USER_URL}/${id}/clearUserReports`);
};

