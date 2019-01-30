import { combineReducers, createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';

import auth from './reducer/auth.reducer';
import user from './reducer/user.reducer';

const rootReducer = combineReducers({
  auth,
  user,
});

export default createStore(
  rootReducer,
  applyMiddleware(reduxLogger),
);
