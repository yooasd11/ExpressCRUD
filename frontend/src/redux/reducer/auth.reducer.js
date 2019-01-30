import AT from '../actions/ActionTypes';
import axiosClient from '../../api/AxiosClient';

const initState = {
	auth: false,
	userId: null,
	error: "",
};

export default (state = initState, action) => {
	switch (action.type) {
		case AT.AUTH:
			if (action.payload) {
				return {
					...state,
					auth: action.payload.auth,
					userId: action.payload.userId
				};
			}
			axiosClient.auth();
			return state;

		case AT.LOGIN:
			if (action.payload) {
				axiosClient.logIn(action.payload);
			}
			return state;

		case AT.LOGOUT:
			axiosClient.logOut();
			return state;

		case AT.JOIN:
			if (action.payload) {
				axiosClient.join(action.payload);
			}
			return state;

		case AT.API_ERROR:
			if (action.payload) {
				return {
					...state,
					error: action.payload,
				}
			}
			return state;
		default:
			return state;
	}
};
