import {
  GET_BALANCE_SUCCESS,
  UPDATE_BALANCE_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BALANCE_SUCCESS:
      return payload;
    case UPDATE_BALANCE_SUCCESS:
      return payload;
    case GET_TRANSACTIONS_SUCCESS:
      return payload;
    default:
      return state;
  }
}

export default userReducer;