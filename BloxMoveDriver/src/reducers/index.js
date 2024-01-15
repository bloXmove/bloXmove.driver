import {combineReducers} from 'redux';
import {auth} from '../screens/Onboarding/redux/index';
import {journey, payment} from '../screens/HomeScreens/redux/index';

const LOG_OUT = 'LOU_OUT';

const AppReducer = combineReducers({
  auth,
  journey,
  payment,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default rootReducer;
