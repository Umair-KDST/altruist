import { SIDENAV_UPDATE } from '../actions/types';

const initialState = {
  collapsed: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SIDENAV_UPDATE:
      return { ...state, collapsed: action.payload }
    default:
      return state
  }
}
