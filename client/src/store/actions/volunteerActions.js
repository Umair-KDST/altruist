import {
  ADD_VOLUNTEER,
  GET_ALL_VOLUNTEERS,
  GET_VOLUNTEERS_BY_USER_ID,
} from "./types";
import {
  getAllVolunteers as _getAllVolunteers,
  addVolunteer as _addVolunteer,
  getVolunteersByUserId as _getVolunteersByUserId,
} from "../../API/volunteerAPI";

export const getAllVolunteers = () => (dispatch) => {
  _getAllVolunteers().then((res) => {
    dispatch({
      type: GET_ALL_VOLUNTEERS,
      payload: res.data,
    });
  });
};

export const addVolunteer = (body) => (dispatch) => {
  _addVolunteer(body).then((res) => {

    dispatch({
      type: ADD_VOLUNTEER,
      payload: res.data,
    });
  });
};

export const getVolunteersByUserId = (id) => (dispatch) => {
  _getVolunteersByUserId(id).then((res) => {
    dispatch({
      type: GET_VOLUNTEERS_BY_USER_ID,
      payload: res.data,
    });
  });
};
