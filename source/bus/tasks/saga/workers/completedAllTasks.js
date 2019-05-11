import { api } from '../../../../REST/api';
import { tasksActions} from '../../actions';
import { put, select, apply } from 'redux-saga/effects';
import { uiActions } from '../../../ui/actions';
import { getTasks } from '../selectors/getTasks';

export function* completedAllTasks({payload: completed}) {
    console.log(completed)

    try {
        const tasks =  yield select(getTasks);

        yield put(uiActions.startFetching());
        const reqData = tasks.map((task) => {
            return task.set('completed', completed);
        });

        const response = yield apply(api, api.tasks.update, [reqData.toJS()]);


        const { message: resMessage } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error( resMessage );
        }

        yield put(tasksActions.completedAllTasks(reqData));

    } catch (e) {
        yield put(uiActions.emitError(e , 'completedAllTasks worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}