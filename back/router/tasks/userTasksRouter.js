const express = require('express');
const userTasksRouter = express.Router();
const { getTaskByUserId, getTaskByAdminId, insertTask, deleteTask, getAllTasks, getToDoTasks, getCompletedTasks, getPendingTasks } = require('../../controllers/tasksController');


userTasksRouter.get('/user/:id', getTaskByUserId);
userTasksRouter.get('/admin', getTaskByAdminId);
userTasksRouter.get('/all', getAllTasks);
userTasksRouter.get('/completed', getCompletedTasks);
userTasksRouter.get('/pending', getPendingTasks);
userTasksRouter.get('/to-do', getToDoTasks);
userTasksRouter.post('/add-task', insertTask);
userTasksRouter.delete('delete-task/:id', deleteTask);


module.exports = userTasksRouter;