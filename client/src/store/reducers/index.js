import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sideNavReducer from "./sideNavReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import volunteerReducer from "./volunteerReducer";
import skillReducer from "./skillReducer";
import reportPostReducer from "./reportPostReducer"
import reportUserReducer from "./reportUserReducer"

export default combineReducers({
  auth: authReducer,
  sideNav: sideNavReducer,
  post: postReducer,
  profile: userReducer,
  comment: commentReducer,
  skill: skillReducer,
  volunteer: volunteerReducer,
  reportPostReducer: reportPostReducer,
  reportUserReducer: reportUserReducer,
});
