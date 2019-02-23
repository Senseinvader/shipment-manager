import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import shipmentReducer from './shipmentReducer';

const rootReducer = combineReducers({
  loginReducer,
  shipmentReducer
});

export default rootReducer;