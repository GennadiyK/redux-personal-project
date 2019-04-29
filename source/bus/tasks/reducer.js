import { types } from './types';
import { fromJS, List } from 'immutable';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        case types.REMOVE_TASK:
            return state.filter(( item ) => {
                return item.get('id') !== action.payload;
            })
        default:
            return state;
    }
};