import {
  GETUSER,
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME,
  VERIFY_USER,
  UNVERIFY_USER,
  GET_DISABLED_USERS
} from "../actions/types";

const initialState = {
  profile: [],
  users: [],
  disabled: [],
  current: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GETUSER:
      return { ...state, users: action.payload };
    case GET_USER_BY_ID:
      return { ...state, current: action.payload };
    case GET_USER_BY_USERNAME:
      return { ...state, profile: action.payload };
    // case VERIFY_USER:
    //   return { ...state, profile: action.payload };
    // case UNVERIFY_USER:
    //   return { ...state, profile: action.payload };
    case GET_DISABLED_USERS:
      return { ...state, disabled: action.payload };

    default:
      return state;
  }
}
