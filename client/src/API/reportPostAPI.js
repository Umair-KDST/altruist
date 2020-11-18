import { REPORT_POST_URL } from "./apiURL";
import axios from "axios";

export const getAllReportedPosts = () => {
  return axios.get(REPORT_POST_URL);
};

export const reportPost = (body) => {
  return axios.post(REPORT_POST_URL, body);
};

export const clearPostReports = (id) => {
  return axios.get(`${REPORT_POST_URL}/${id}/clearPostReports`);
};

export const deleteReportedPost = (id) => {
  return axios.get(`${REPORT_POST_URL}/${id}/deleteReportedPost`);
};

export const getReportedPostByUserId = (id) => {
  // return axios.get(`${REPORT_POST_URL}/${id}`)
  return axios.get(`${REPORT_POST_URL}/${id}`);
};

