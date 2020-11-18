import { COMMENT_URL } from "./apiURL";
import axios from "axios";

export const getAllComments = () => {
    return axios.get(COMMENT_URL);
};

export const addComment = (body) => {
    return axios.post(COMMENT_URL, body)
}

export const addReply = (id, body) => {
    return axios.post(`${COMMENT_URL}/${id}/reply`, body)
}


export const getCommentsByPostId = (id) => {
    // return axios.get(`${COMMENT_URL}/${id}`)
    return axios.get(`${COMMENT_URL}/${id}`)
}
export const deleteCommentById = (id) => {
    return axios.get(`${COMMENT_URL}/${id}/delete`)
}
