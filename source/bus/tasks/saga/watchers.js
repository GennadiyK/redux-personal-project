import { takeEvery, all, call } from 'redux-saga/effects';
import { types } from '../types';
import {
    createTask,
    fetchTasks,
    removeTask,
    updateTask,
    completedAllTasks,
} from './workers';

export function* watchCreateTask() {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

export function* watchFetchTasks() {
    yield takeEvery(types.FETCH_TASKS, fetchTasks);
}

export function* watchRemoveTasks() {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

export function* watchUpdateTasks() {
    yield takeEvery(types.UPDATE_TASK_ASYNC, updateTask);
}

export function* watchCompletedAllTasks() {
    yield takeEvery(types.COMPLETED_ALL_TASKS_ASYNC, completedAllTasks);
}

export function* watchTasks() {
    yield all([
        call(watchCreateTask),
        call(watchFetchTasks),
        call(watchRemoveTasks),
        call(watchUpdateTasks),
        call(watchCompletedAllTasks),
    ]);
}