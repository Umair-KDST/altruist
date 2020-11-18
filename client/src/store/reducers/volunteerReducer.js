import {
  ADD_VOLUNTEER,
  GET_ALL_VOLUNTEERS,
  GET_VOLUNTEERS_BY_USER_ID,
} from "../actions/types";

const initialState = {
  volunteers: [],
};

const deleteComment = (oldList, doc) => {
  return oldList.filter((x) => x._id !== doc._id);
};
const addVolunteer = (oldList, doc) => {
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
    case GET_ALL_VOLUNTEERS:
      return { ...state, volunteers: action.payload };
    case ADD_VOLUNTEER:
      return {
        ...state,
        volunteers: addVolunteer(state.volunteers, action.payload),
      };
    case GET_VOLUNTEERS_BY_USER_ID:
      return { ...state, volunteers: action.payload };

    default:
      return state;
  }
}
