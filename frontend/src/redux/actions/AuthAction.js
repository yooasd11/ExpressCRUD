import { actionCreator } from '../lib';
import AT from './ActionTypes';

export default {
  auth: actionCreator(AT.AUTH),
  login: actionCreator(AT.LOGIN),
  logout: actionCreator(AT.LOGOUT),
};
