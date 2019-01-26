import { combineReducers, createStore } from 'redux';

import auth from './reducer/auth.reducer';

const rootReducer = combineReducers({
  auth,
});

export default createStore(
  rootReducer,
);
