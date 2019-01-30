import { actionCreator } from '../lib';
import AT from './ActionTypes';

export default {
  fetch: actionCreator(AT.USERS),
};
