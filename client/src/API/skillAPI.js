import { SKILL_URL } from "./apiURL";
import axios from "axios";

export const getAllSkills = () => {
  return axios.get(SKILL_URL);
};

export const addSkill = (body) => {
  return axios.post(SKILL_URL, body);
};
