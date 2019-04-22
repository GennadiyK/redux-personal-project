import { api } from '../../../../REST/api';
import { tasksActions} from '../../actions';
import { put, apply } from 'redux-saga/effects';
// import { uiActions } from '../../../ui/actions';

export function* createTask({payload: task}) {
    try {
         // yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.create, [task]);

        const { data, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error( message );
        }
        yield put(tasksActions.createTask(data));

    } catch (e) {
     // yield put(uiActions.emitError(e , ' worker'));
    } finally {
        // yield put(uiActions.stopFetching());
    }
}