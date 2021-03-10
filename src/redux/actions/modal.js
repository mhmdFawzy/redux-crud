import { MODAL_STATUS } from '../types';

export function modalToggle(id) {
  return { type: MODAL_STATUS, payload: id };
}
