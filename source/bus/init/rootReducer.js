import { combineReducers } from 'redux';
import { tasksReducer as tasks } from '../tasks/reducer';

export const rootReducer = combineReducers({
    tasks,
});