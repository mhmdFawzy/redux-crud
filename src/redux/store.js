import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());
export default store;
