import { GET_ALL_SKILLS, ADD_SKILL } from "./types";
import {
  getAllSkills as _getAllSkills,
  addSkill as _addSkill,
} from "../../API/skillAPI";

export const getAllSkills = () => (dispatch) => {
  _getAllSkills().then((res) => {
    dispatch({
      type: GET_ALL_SKILLS,
      payload: res.data,
    });
  });
};

export const addSkill = (body, goBack) => (dispatch) => {
  _addSkill(body).then((res) => {
    dispatch({
      type: ADD_SKILL,
      payload: res.data,
    });
  });
};
