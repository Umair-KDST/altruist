import { GET_ALL_SKILLS } from "../actions/types";

const initialState = {
  skills: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SKILLS:
      return { ...state, skills: action.payload };
    default:
      return state;
  }
}
