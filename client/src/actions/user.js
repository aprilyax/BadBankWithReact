import UserService from "../services/user.service";
import {
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAIL,
  SET_MESSAGE,
  UPDATE_BALANCE_SUCCESS,
  UPDATE_BALANCE_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_ALL_SUCCESS,
  GET_ALL_FAIL,
} from "./type";

export const getUserBalance = (userID) => (dispatch) => {
  return UserService.getUserBalance(userID).then(
    (response) => {
      dispatch({
        type: GET_BALANCE_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_BALANCE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateUserBalance =
  (userID, amount, balance, transType) => (dispatch) => {
    return UserService.updateUserBalance(
      userID,
      amount,
      balance,
      transType
    ).then(
      (response) => {
        dispatch({
          type: UPDATE_BALANCE_SUCCESS,
          payload: response.data,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: UPDATE_BALANCE_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

// Get User's transactions history
export const getUserTrans = (userID) => (dispatch) => {
  return UserService.getUserTrans(userID).then(
    (response) => {
      dispatch({
        type: GET_TRANSACTIONS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_TRANSACTIONS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

// Get all users
export const getAllUsers = (userID) => (dispatch) => {
  return UserService.getAllUsers(userID).then(
    (response) => {
      dispatch({
        type: GET_ALL_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ALL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};