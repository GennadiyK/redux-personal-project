import { takeEvery, all, call } from 'redux-saga/effects';
import { types } from '../types';
import { createTask, fetchTasks, removeTask, editTask } from './workers';

export function* watchCreateTask() {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

export function* watchFetchTasks() {
    yield takeEvery(types.FETCH_TASKS, fetchTasks);
}

export function* watchRemoveTasks() {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

export function* watchEditTasks() {
    yield takeEvery(types.EDIT_TASK_ASYNC, editTask);
}
export function* watchTasks() {
    yield all([
        call(watchCreateTask),
        call(watchFetchTasks),
        call(watchRemoveTasks),
        call(watchEditTasks),
    ]);
}