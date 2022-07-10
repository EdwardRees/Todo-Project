import { combineReducers } from "redux";
import auth from './auth';
import list from './list';
import todo from './todo';

export default combineReducers({
  auth,
  list,
  todo
});