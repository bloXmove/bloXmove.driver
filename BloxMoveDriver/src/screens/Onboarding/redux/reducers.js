import {
  UPDATE_USER,
  UPDATE_TOKEN,
  UPDATE_ACCOUNT_ID,
  GET_USER_FAIL,
  LOG_OUT,
  SET_MANUFACTURE,
} from './types';

export const DUMMY_USER_DATA = {};
export const manufacturerList = {};
export const accountId = '';
export const token = '';

const initialState = {
  user: DUMMY_USER_DATA,
  manufacturerList: manufacturerList,
  accountId: accountId,
  token: token,
  loading: true,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.data.data,
        loading: action.data.loading,
      };
    case UPDATE_ACCOUNT_ID:
      return {
        ...state,
        accountId: action.data.accountId,
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.data.token,
      };
    case SET_MANUFACTURE:
      return {
        ...state,
        manufacturerList: action.data.data,
      };
    case LOG_OUT: {
      console.log('LOG_OUT');
      return initialState;
    }
    case GET_USER_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
