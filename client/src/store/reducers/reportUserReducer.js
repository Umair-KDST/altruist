import {
  REPORT_USER,
  GET_ALL_REPORTED_USERS,
  GET_REPORTED_USERS_BY_USER_ID,
  CLEAR_USER_REPORTS,
} from "../actions/types";

const initialState = {
  reportedUsers: [],
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
    case GET_ALL_REPORTED_USERS:
      return { ...state, reportedUsers: action.payload };
    // case REPORT_USER:
    //   return {
    //     ...state,
    //     reportedUsers: reportPost(state.reportedUsers, action.payload),
    //   };
    case GET_REPORTED_USERS_BY_USER_ID:
      return { ...state, reportedUsers: action.payload };
    case CLEAR_USER_REPORTS:
      return {
        ...state, reportedUsers: deleteReports(state.reportedUsers, action.payload)
      };

    default:
      return state;
  }
}
