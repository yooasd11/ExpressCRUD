import AT from '../actions/ActionTypes';
import authAction from '../actions/AuthAction';
import axios from 'axios';
import { AUTH_URL } from '../../api/config';
import store from '../store';

const initState = {
	auth: false,
	userId: null
};
function fetchAuth() {
	axios.get(AUTH_URL, { withCredentials: true })
		.then(res => {
			store.dispatch({ type: AT.AUTH, payload: res.data });
		})
		.catch(err => {
			if (err.response) {
				console.log("error response : ", err.response);
			} else if (err.request) {
				console.log("error request : ", err.request);
			} else {
				console.log("error message : ", err.message);
			}
			console.log("error config : ", err.config);
		});
}

export default (state = initState, action) => {
	switch (action.type) {
		case AT.AUTH:
			if (action.payload) {
				return {
					...state,
					auth: String(action.payload.auth),
					userId: action.payload.userId
				};
			}
			fetchAuth();
			return state;
		default:
			return state;
	}
};
