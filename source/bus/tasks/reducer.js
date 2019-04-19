import { types } from './types';
import { fromJS, List } from 'immutable';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_TASK:
            console.log('111',action)
            return state.unshift(fromJS(action.payload));
        default:
            return state;
    }
};