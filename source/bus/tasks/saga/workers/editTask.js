import { api } from '../../../../REST/api';
import { tasksActions} from '../../actions';
import { put, apply } from 'redux-saga/effects';
import { uiActions } from '../../../ui/actions';

export function* editTask({payload: {id, message}}) {
    try {
         yield put(uiActions.startFetching());
        const response = yield apply(api, api.tasks.edit, [{id, message}]);

        const { resMessage } = yield apply(response, response.json);
        if (response.status !== 200) {
           Error( resMessage );
        }
        yield put(tasksActions.editTask({id, resMessage}));
        yield put(uiActions.stopFetching());

    } catch (e) {
     yield put(uiActions.emitError(e , ' editTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}