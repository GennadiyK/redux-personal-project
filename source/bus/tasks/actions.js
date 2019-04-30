import { types } from './types';

export const tasksActions = {
    createTask: (task)=> {
        return {
            type: types.CREATE_TASK,
            payload: task
        };
    },
    removeTask: (taskId)=> {
        return {
            type: types.REMOVE_TASK,
            payload: taskId
        };
    },
    editTask: (taskData)=> {
        return {
            type: types.EDIT_TASKS,
            payload: taskData
        };
    },
    fillTasks: (tasks) => {
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
    removeTaskAsync: (taskId)=> {
        return {
            type: types.REMOVE_TASK_ASYNC,
            payload: taskId
        };
    },
    editTaskAsync: (taskData)=> {
        return {
            type: types.EDIT_TASKS_ASYNC,
            payload: taskData
        };
    }
};