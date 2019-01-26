import AT from '../actions/ActionTypes';
import axios from 'axios';
import { AUTH_URL } from '../../api/config';

const initState = {
  auth: false,
  userId: null,
};
async function fetchAuth() {
  // axios.get(AUTH_URL, { withCredentials: true })
  //     .then(res => {
  //       this.setState({
  //         auth: res.data.auth,
  //         userId: res.data.userId,
  //       });
  //     })
  //     .catch(err => {
  //       if (err.response) {
  //         console.log("error response : ", err.response);
  //       } else if (err.request) {
  //         console.log("error request : ", err.request);
  //       } else {
  //         console.log("error message : ", err.message);
  //       }
  //       console.log("error config : ", err.config);
  //     })
 return await axios.get(AUTH_URL, { withCredentials: true });
}

export default (state = initState, action) => {
  switch (action.type) {
    case AT.AUTH:
      let fetchedAuth = fetchAuth();
      return {
        ...state,
        auth: fetchedAuth.auth,
        userId: fetchedAuth.userId,
      };
    default:
      return state;
  }
};
