import { combineReducers } from 'redux';
import { tasksReducer as tasks } from '../tasks/reducer';
import { uiReducer as ui } from '../ui/reducer';

export const rootReducer = combineReducers({
    ui,
    tasks,
});