import { VOLUNTEER_URL } from "./apiURL";
import axios from "axios";

export const getAllVolunteers = () => {
  return axios.get(VOLUNTEER_URL);
};

export const addVolunteer = (body) => {
  return axios.post(VOLUNTEER_URL, body);
};

export const getVolunteersByUserId = (id) => {
  // return axios.get(`${VOLUNTEER_URL}/${id}`)
  return axios.get(`${VOLUNTEER_URL}/${id}`);
};

// export const deleteVolunteerById = (id) => {
//   return axios.get(`${VOLUNTEER_URL}/${id}/delete`);
// };
