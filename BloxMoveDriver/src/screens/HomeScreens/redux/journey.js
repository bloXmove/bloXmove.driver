import {
  SET_JOURNEY,
  GET_JOURNEY_FAIL,
  SET_CURRENT,
  SET_LIST_JOURNEY,
  SET_CURRENT_LOCATION,
  DELETE_REQUEST,
  SET_ACCEPT_ID,
} from './types';

export const initialData = [];

const initialState = {
  journeyList: initialData,
  listOrders: initialData,
  currentJourney: {},
  loading: true,
  curentLocation: {},
  acceptId: '',
};

export const journey = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_JOURNEY:
      return {
        ...state,
        listOrders: action.data.data,
      };
    case SET_ACCEPT_ID:
      return {
        ...state,
        acceptId: action.data.data,
      };
    case DELETE_REQUEST:
      const listOrders = [...state.listOrders];
      const foundIndex = listOrders.findIndex(
        item => item.callUUID === action.data.data,
      );
      if (foundIndex !== -1 && state.acceptId !== action.data.data) {
        listOrders.splice(foundIndex, 1);
      }
      return {
        ...state,
        listOrders: listOrders,
      };
    case SET_JOURNEY:
      return {
        ...state,
        journeyList: action.data.data,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        currentJourney: action.data.data,
        loading: false,
      };
    case GET_JOURNEY_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        curentLocation: action.data.data,
      };
    default:
      return state;
  }
};
