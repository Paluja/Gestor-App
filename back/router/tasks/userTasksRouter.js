const express = require('express');
const userTasksRouter = express.Router();
const { getTaskByUserId, getTaskByAdminId, insertTask, deleteTask, getAllTasks } = require('../../controllers/tasksController');


userTasksRouter.get('/user', getTaskByUserId);
userTasksRouter.get('/admin', getTaskByAdminId);
userTasksRouter.get('/all', getAllTasks);
userTasksRouter.post('/add-task', insertTask);
userTasksRouter.delete('delete-task/:id', deleteTask);


module.exports = userTasksRouter;