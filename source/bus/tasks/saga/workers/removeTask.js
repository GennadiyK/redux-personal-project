import { api } from '../../../../REST/api';
import { tasksActions} from '../../actions';
import { put, apply } from 'redux-saga/effects';
import { uiActions } from '../../../ui/actions';

export function* removeTask({payload: id}) {
    try {
         yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.remove, [id]);


        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);
            throw new Error( message );
        }
        yield put(tasksActions.removeTask(id));

    } catch (e) {
     yield put(uiActions.emitError(e , ' removeTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}