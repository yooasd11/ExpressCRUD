import AT from '../actions/ActionTypes';
import axiosClient from '../../api/AxiosClient';

const initState = {
	users: [],
};

export default (state = initState, action) => {
	switch (action.type) {
		case AT.USERS:
			if (action.payload && action.payload.length > 0) {
				console.log('users action payload : ', action.payload);
				return {
					...state,
					users: action.payload,
				};
			}
			axiosClient.fetchUsers();
			return state;
		default:
			return state;
	}
};
