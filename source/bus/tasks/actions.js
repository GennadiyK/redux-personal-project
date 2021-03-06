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
    updateTask: (taskData)=> {
        return {
            type: types.UPDATE_TASK,
            payload: taskData
        };
    },
    completedAllTasks: (completed) => {
       return {
           type: types.COMPLETED_ALL_TASKS,
           payload: completed,
       }
    },
    editingTask: (id)=> {
        return {
            type: types.EDITING_TASK,
            payload: id
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
    updateTaskAsync: (taskData)=> {
        return {
            type: types.UPDATE_TASK_ASYNC,
            payload: taskData
        };
    },
    completedAllTasksAsync: (completed) => {
        return {
            type: types.COMPLETED_ALL_TASKS_ASYNC,
            payload: completed,
        }
    },
};