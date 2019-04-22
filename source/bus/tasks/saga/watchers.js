import { takeEvery, all, call } from 'redux-saga/effects';
import { types } from '../types';
import { createTask, fetchTasks } from './workers';

export function* watchCreateTask() {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

export function* watchFetchTasks() {
    yield takeEvery(types.FETCH_TASKS, fetchTasks);
}

export function* watchTasks() {
    yield all([call(watchCreateTask), call(watchFetchTasks)]);
}