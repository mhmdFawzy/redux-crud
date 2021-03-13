import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, SET_CURRENT_ITEM, CLEAR_CURRENT_ITEM } from '../types';

const initialState = { itemsById: {}, itemdIds: [], currentItem: {} };

export default function itemsReducer(state = initialState, action) {
  const id = action?.payload?.id;

  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        itemsById: { ...state.itemsById, [id]: action.payload },
        itemdIds: [...state.itemdIds, id],
      };
    }
    case SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: state.itemsById[id],
      };
    }
    case CLEAR_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: {},
      };
    }
    case EDIT_ITEM: {
      const item = state.itemsById[id];
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...item,
            ...action.payload.formData,
          },
        },
      };
    }
    case DELETE_ITEM: {
      const { [id]: value, ...modifiedObj } = state.itemsById;
      return {
        ...state,
        itemsById: modifiedObj,
        itemdIds: state.itemdIds.filter(item => item !== id),
      };
    }
    default:
      return state;
  }
}
