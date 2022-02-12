import { combineReducers } from "redux";
import auth from "../reducers/auth";
import user from "../reducers/user";
import message from "../reducers/message";

export default combineReducers({
  auth,
  message,
  user,
});