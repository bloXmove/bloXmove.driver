import {
  SET_JOURNEY,
  SET_CURRENT,
  SET_TRANSACTION_LIST,
  SET_RATE,
  GET_JOURNEY_FAIL,
  SET_BANK_LIST,
  SET_BLXM,
  SET_USDC,
  SET_NGN,
  SET_LIST_JOURNEY,
  UPDATE_LOADING,
  SET_NFTICKET,
  SET_CURRENT_LOCATION,
  DELETE_REQUEST,
  SET_ACCEPT_ID,
} from './types';

// New Requests
export const setListJourney = data => ({
  type: SET_LIST_JOURNEY,
  data,
});
export const deleteRequest = data => ({
  type: DELETE_REQUEST,
  data,
});
export const setAcceptId = data => ({
  type: SET_ACCEPT_ID,
  data,
});
// Journey
export const setCurrent = data => ({
  type: SET_CURRENT,
  data,
});
export const setJourney = data => ({
  type: SET_JOURNEY,
  data,
});
export const getJourneyFail = data => ({
  type: GET_JOURNEY_FAIL,
  data,
});
// NFT
export const setNFTBalance = data => ({
  type: SET_NFTICKET,
  data,
});
// Payments
export const setTransactionList = data => ({
  type: SET_TRANSACTION_LIST,
  data,
});
export const updatePaymentLoading = data => ({
  type: UPDATE_LOADING,
  data,
});
export const setRate = data => ({
  type: SET_RATE,
  data,
});
export const setBankList = data => ({
  type: SET_BANK_LIST,
  data,
});
export const setNGN = data => ({
  type: SET_NGN,
  data,
});

export const setBLXM = data => ({
  type: SET_BLXM,
  data,
});

export const setUSDC = data => ({
  type: SET_USDC,
  data,
});

export const setCurrentLocation = data => ({
  type: SET_CURRENT_LOCATION,
  data,
});
