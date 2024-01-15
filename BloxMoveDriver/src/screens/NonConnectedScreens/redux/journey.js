import {
  SET_JOURNEY,
  GET_JOURNEY_FAIL,
  SET_CURRENT,
  SET_LIST_JOURNEY,
} from './types';

export const initialData = [];

const initialState = {
  journeyList: initialData,
  listOrders: initialData,
  currentJourney: {},
  loading: true,
};

export const journey = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_JOURNEY:
      return {
        ...state,
        listOrders: action.data.data,
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
    default:
      return state;
  }
};
