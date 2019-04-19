import { takeEvery, all, call } from 'redux-saga/effects';
import { types } from '../types';
import { createTask } from './workers';

export function* watchCreateTask() {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

export function* watchTasks() {
    yield all([call(watchCreateTask)]);
}