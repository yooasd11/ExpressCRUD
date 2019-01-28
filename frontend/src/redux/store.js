import { combineReducers, createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';

import auth from './reducer/auth.reducer';

const rootReducer = combineReducers({
  auth,
});

export default createStore(
  rootReducer,
  applyMiddleware(reduxLogger),
);
