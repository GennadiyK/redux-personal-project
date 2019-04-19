import { all, call } from 'redux-saga/effects';
import { watchTasks }  from '../tasks/saga/watchers';

export function* rootSaga () {
    yield all([call(watchTasks)]);
}