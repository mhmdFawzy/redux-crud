import { ADD_ITEM, DELETE_ITEM, SET_CURRENT_ITEM, CLEAR_CURRENT_ITEM, EDIT_ITEM } from '../types';
import { v4 as uuidv4 } from 'uuid';

export function addItem(payload) {
  return { type: ADD_ITEM, payload: { id: uuidv4(), ...payload } };
}
export function editItem(formData, id) {
  return { type: EDIT_ITEM, payload: { formData, id } };
}
export function setCurrentItem(id) {
  return { type: SET_CURRENT_ITEM, payload: { id } };
}
export function clearCurrentItem() {
  return { type: CLEAR_CURRENT_ITEM };
}
export function deleteItem(id) {
  return { type: DELETE_ITEM, payload: { id } };
}
