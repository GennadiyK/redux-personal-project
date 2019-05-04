import { api } from '../../../../REST/api';
import { tasksActions } from '../../actions';
import { put, apply } from 'redux-saga/effects';
import { uiActions } from '../../../ui/actions';

export function* fetchTasks() {
    try {
        const response = yield apply(api, api.tasks.fetch);
        const { data, message } = yield apply(response, response.json);
console.log('fetchTasks',data)
        if (response.status !== 200) {
            throw new Error( message );
        }
        yield put(tasksActions.fillTasks(data));

    } catch (e) {
        yield put(uiActions.emitError(e , 'fetchPost worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}