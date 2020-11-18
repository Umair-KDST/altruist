import { POST_URL } from "./apiURL";
import axios from "axios";

export const getPost = (query) => {
  return axios.get(`${POST_URL}/${query}`);
};

export const puslish = (body) => {
  return axios.post(POST_URL, body);
};

export const getPostById = (id) => {
  return axios.get(`${POST_URL}/${id}/getPost`);
};

export const getPostsByUserId = (id) => {
  return axios.get(`${POST_URL}/${id}/getUserPosts`);
};

export const getVolunteeredPosts = (id) => {
  return axios.get(`${POST_URL}/${id}/getVolunteeredPosts`);
};

export const deletePostById = (id) => {
  return axios.get(`${POST_URL}/${id}/delete`);
};

export const editPostById = (id, body) => {
  return axios.put(`${POST_URL}/${id}/edit`, body);
};

// export const addComment = (id, body) => {
//   return axios.post(`${POST_URL}/${id}/comment`, body)
// }

// export const addVolunteer = (id, body) => {
//   return axios.post(`${POST_URL}/${id}/volunteer`, body)
// }
