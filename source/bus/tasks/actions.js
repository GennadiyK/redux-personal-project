import { types } from './types';

export const tasksActions = {
    createTask: (task)=> {
        return {
            type: types.CREATE_TASK,
            payload: task
        };
    },
    fillTasks: (tasks) => {
        console.log('fillTasks', tasks)
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    fetchTasks: () => async (dispatch) => {
        dispatch({
            type: types.FETCH_TASKS,
        });
    },


    createTaskAsync: (task)=> {
        return {
            type: types.CREATE_TASK_ASYNC,
            payload: task,
        };
    },
};