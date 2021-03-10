import { combineReducers } from 'redux';
import items from './items';
import modal from './modal';
const rootReducer = combineReducers({
  items,
  modal,
});
export default rootReducer;
