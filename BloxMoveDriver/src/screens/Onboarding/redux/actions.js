import {
  UPDATE_USER,
  UPDATE_TOKEN,
  UPDATE_ACCOUNT_ID,
  GET_USER_FAIL,
  LOG_OUT,
  SET_MANUFACTURE,
} from './types';

export const setUserData = data => ({
  type: UPDATE_USER,
  data,
});

export const getUserFail = data => ({
  type: GET_USER_FAIL,
  data,
});

export const setAccountId = data => ({
  type: UPDATE_ACCOUNT_ID,
  data,
});

export const setToken = data => ({
  type: UPDATE_TOKEN,
  data,
});

export const setManucatureList = data => ({
  type: SET_MANUFACTURE,
  data,
});

export const logout = () => ({
  type: LOG_OUT,
});
