import { actionCreator } from '../lib';
import AT from './ActionTypes';

export default {
  auth: actionCreator(AT.AUTH),
  logIn: actionCreator(AT.LOGIN),
  logOut: actionCreator(AT.LOGOUT),
  join: actionCreator(AT.JOIN),
};
