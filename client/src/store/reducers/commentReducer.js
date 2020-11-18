import { ADD_COMMENT, GET_ALL_COMMENTS, GET_COMMENTS_BY_POST_ID, ADD_REPLY, DELETE_COMMENT_BY_ID } from "../actions/types";

const initialState = {
    comments: [],
    postComments: []
};
const deleteComment = (oldList, doc) => {
    return oldList.filter((x) => x._id !== doc._id)
}
const addComment = (oldList, doc) => {
    console.log('doc', doc)
    let newList = oldList
    newList.push(doc)
    return newList
}
const updateList = (oldList, doc) => {
    let newList = [];
    oldList.forEach(post => {
        if (post._id === doc._id) {
            post = doc;
        }
        newList.push(post)
    });
    return newList
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS_BY_POST_ID:
            return { ...state, postComments: action.payload };
        case DELETE_COMMENT_BY_ID:
            return { ...state, postComments: deleteComment(state.postComments, action.payload) };
        case GET_ALL_COMMENTS:
            return { ...state, comments: action.payload };
        case ADD_COMMENT:
            return { ...state, postComments: addComment(state.postComments, action.payload) };
        case ADD_REPLY:
            return { ...state, postComments: updateList(state.postComments, action.payload) };
        default:
            return state;
    }
}
