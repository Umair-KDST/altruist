import { SIDENAV_UPDATE } from './types';

export const onCollapse = (collapsed) => dispatch => {
  dispatch({
    type: SIDENAV_UPDATE,
    payload: collapsed
  })
}
