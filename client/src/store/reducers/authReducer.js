import { LOGIN, SIGNUP, SETUSER, LOGIN_FAILED } from '../actions/types';

const initialState = {
	user: null,
	loginErr: ''
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			localStorage.setItem('user', JSON.stringify(action.payload))
			return { ...state, user: action.payload, loginErr: '' }
		case LOGIN_FAILED:
			return { ...state, loginErr: action.payload }
		case SETUSER:
			return { ...state, user: action.payload, loginErr: '' }
		default:
			return state
	}
}

