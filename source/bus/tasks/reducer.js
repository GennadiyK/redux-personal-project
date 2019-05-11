import { types } from './types';
import { fromJS, List } from 'immutable';

const initialState = {
    editingId: null,
    list: List(),
    completedAll: null,
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
        case types.COMPLETED_ALL_TASKS:

            return {
                ...state,
                list: fromJS(action.payload),
            }
        case types.CREATE_TASK:
            return {
                ...state,
                list: state.list.unshift(fromJS(action.payload)),
            }
        case types.EDITING_TASK:
            return {
                ...state,
                editingId: action.payload,
            }
        case types.REMOVE_TASK:
            return {
                ...state,
                list: state.list.filter(( item ) => {
                    return item.get('id') !== action.payload.id;
                }),
            }
        case types.UPDATE_TASK:
            return {
                ...state,
                list: state.list.update(
                    state.list.findIndex((task) => task.get('id') === action.payload.id),
                    () => fromJS(action.payload)),
            }
        default:
            return state;
    }
};