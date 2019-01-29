import axios from 'axios';
import { AUTH_URL } from './config';
import AT from '../redux/actions/ActionTypes';
import store from '../redux/store';

class AxiosClient {
	
	errorLogger(err) {
		if (err.response) {
			console.log("error response : ", err.response);
		} else if (err.request) {
			console.log("error request : ", err.request);
		} else {
			console.log("error message : ", err.message);
		}
		console.log("error config : ", err.config);
	}

 	static fetchAuth() {
        axios.get(AUTH_URL, { withCredentials: true })
		.then(res => {
			store.dispatch({ type: AT.AUTH, payload: res.data });
		})
		.catch(this.errorLogger);
	}

	static logIn(authInput) {
		console.log('auth input : ', authInput);
		axios.post(AUTH_URL + '/login', authInput, { withCredentials: true })
            .then(res => {
                console.log('login result : ', res.data);
                store.dispatch({ type: AT.AUTH });
            })
            .catch(this.errorLogger);
	}

	static logOut() {
		axios.get(AUTH_URL + '/logout', { withCredentials: true })
            .then(res => {
                if (res.data.success) {
                    alert('Logout successful!');
				}
				store.dispatch({ type: AT.AUTH });
            })
            .catch(this.errorLogger);
	}
}

export default AxiosClient;