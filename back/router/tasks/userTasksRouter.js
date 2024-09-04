const express = require('express');
const userTasksRouter = express.Router();
const { getTaskByUserId, getTaskByAdminId, insertTask, 
        deleteTask, getAllTasks, getToDoTasks, getCompletedTasks, 
        getPendingTasks, updateTask,getTaskById } = require('../../controllers/tasksController');


userTasksRouter.get('/user/:id', getTaskByUserId);
userTasksRouter.get('/admin', getTaskByAdminId);
userTasksRouter.get('/all', getAllTasks);
userTasksRouter.get('/completed', getCompletedTasks);
userTasksRouter.get('/pending', getPendingTasks);
userTasksRouter.get('/to-do', getToDoTasks);
userTasksRouter.get('/:id', getTaskById);
userTasksRouter.post('/add-task', insertTask);
userTasksRouter.delete('delete-task/:id', deleteTask);
userTasksRouter.put('/update-task/:id', updateTask);


module.exports = userTasksRouter;