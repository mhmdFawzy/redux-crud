import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, SET_CURRENT_ITEM, CLEAR_CURRENT_ITEM } from '../types';

const initialState = { items: [], currentItem: {} };

export default function itemsReducer(state = initialState, action) {
  const id = action?.payload?.id;

  switch (action.type) {
    case ADD_ITEM: {
      return { ...state, items: [...state.items, action.payload] };
    }
    case SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: state.items.find(item => {
          return item.id === id;
        }),
      };
    }
    case CLEAR_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: {},
      };
    }
    case EDIT_ITEM: {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === id) {
            return { id, ...action.payload.formData };
          } else {
            return item;
          }
        }),
      };
    }
    case DELETE_ITEM: {
      return { ...state, items: state.items.filter(item => item.id !== id) };
    }
    default:
      return state;
  }
}
