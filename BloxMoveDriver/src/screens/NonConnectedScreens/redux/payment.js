import {
  SET_TRANSACTION_LIST,
  SET_RATE,
  SET_BANK_LIST,
  SET_NGN,
  SET_BLXM,
  SET_USDC,
  UPDATE_LOADING,
} from './types';

export const initialData = [];
export const rates = [];

const initialState = {
  transactionList: initialData,
  rates: [],
  ngn: 0,
  blxm: 0,
  usdc: 0,
  loading: true,
};

export const payment = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTION_LIST:
      return {
        ...state,
        transactionList: action.data.data,
        loading: action.data.loading,
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.data.loading,
      };
    case SET_RATE:
      return {
        ...state,
        rates: action.data.data,
      };
    case SET_BANK_LIST:
      return {
        ...state,
        bankList: action.data.data,
      };
    case SET_NGN:
      return {
        ...state,
        ngn: action.data.data,
      };
    case SET_BLXM:
      return {
        ...state,
        blxm: action.data.data,
      };
    case SET_USDC:
      return {
        ...state,
        usdc: action.data.data,
      };
    default:
      return state;
  }
};
