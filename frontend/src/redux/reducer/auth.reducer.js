import AT from '../actions/ActionTypes';
import axiosClient from '../../api/AxiosClient';

const initState = {
	auth: false,
	userId: null
};

export default (state = initState, action) => {
	console.log('action type : ', action.type);
	switch (action.type) {
		case AT.AUTH:
			if (action.payload) {
				return {
					...state,
					auth: action.payload.auth,
					userId: action.payload.userId
				};
			}
			axiosClient.fetchAuth();
			return state;

		case AT.LOGIN:
			if (action.payload) {
				axiosClient.logIn(action.payload);
			}
			return state;

		case AT.LOGOUT:
			axiosClient.logOut();
			return state;
			
		default:
			return state;
	}
};
