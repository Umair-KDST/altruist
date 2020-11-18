import {
  REPORT_POST,
  GET_ALL_REPORTED_POSTS,
  GET_REPORTED_POSTS_BY_USER_ID,
  CLEAR_POST_REPORTS,
} from "../actions/types";

const initialState = {
  reportedPosts: [],
};

const deleteReports = (oldList, doc) => {
  return oldList.filter((x) => x._id !== doc);
};
const reportPost = (oldList, doc) => {
  console.log("doc", doc);
  let newList = oldList;
  newList.push(doc);
  return newList;
};
const updateList = (oldList, doc) => {
  let newList = [];
  oldList.forEach((post) => {
    if (post._id === doc._id) {
      post = doc;
    }
    newList.push(post);
  });
  return newList;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REPORTED_POSTS:
      return { ...state, reportedPosts: action.payload };
    // case REPORT_POST:
    //   return {
    //     ...state,
    //     reportedPosts: reportPost(state.reportedPosts, action.payload),
    //   };
    case GET_REPORTED_POSTS_BY_USER_ID:
      return { ...state, reportedPosts: action.payload };
    case CLEAR_POST_REPORTS:
      return { ...state, reportedPosts: deleteReports(state.reportedPosts, action.payload) };

    default:
      return state;
  }
}
