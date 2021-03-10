import { MODAL_STATUS } from '../types';

const initialState = false;
export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_STATUS: {
      return !state;
    }
    default:
      return state;
  }
}
