import AT from '../actions/ActionTypes';
import axios from 'axios';
import { AUTH_URL } from '../../api/config';

const initState = {
	auth: false,
	userId: null
};
async function fetchAuth() {
  let response = await axios.get(AUTH_URL, { withCredentials: true });
  return response.data;
}

export default (state = initState, action) => {
	switch (action.type) {
		case AT.AUTH:
      let fetchedAuth = fetchAuth();
      // TODO : implement middleware for http request
			return {
				...state,
				auth: fetchedAuth.auth,
				userId: fetchedAuth.userId
			};
		default:
			return state;
	}
};
