const tasksData = require('../services/dao/tasksDao');
const { SignJWT, jwtVerify } = require('jose');
const md5 = require('md5');



const getTaskByUserId = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.sendStatus(401);
    try {
        
        const tasks = await tasksData.getTaskByUserId(id);
        return res.status(200).send(tasks);
    } catch (error) {
        console.error('Error getTaskByUserId:', error);
        return res.status(500).send('Internal server error');
    }
}

const getTaskByAdminId = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    try {
        const encoder = new TextEncoder();
        const { payload }  = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const tasks = await tasksData.getByAdminId(payload.id_admin);
        return res.status(200).send(tasks);
    } catch (error) {
        if (error.code === 'ERR_JWT_EXPIRED') {
            console.error('JWT expired:', error);
            return res.status(401).send('Token expired');
        }
        console.error('Error getTaskByAdminId:', error);
        return res.status(500).send('Internal server error');
    }
}

const insertTask = async (req, res) => {
    
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    try {
        const encoder = new TextEncoder();
        const { payload }  = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const task = {
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            user_id: req.body.user_id,
            admin_id: payload.id_admin
        }
        const result = await tasksData.insertTask(task);
        return res.sendStatus(200);
    } catch (error) {
        console.error('Error insertTask:', error);
        return res.status(500).send('Internal server error');
    }
}

const deleteTask = async (req, res) => {
    try {
        const result = await tasksData.deleteTask(req.body.id);
        return res.status(200).send(result);
    } catch (error) {
        console.error('Error deleteTask:', error);
        return res.status(500).send('Internal server error');
    }
}

const getAllTasks = async (req, res) => {
    try {
        const result = await tasksData.getAllTasks();
        return res.status(200).send(result);
    }
    catch (error) {
        console.error('Error getAllTasks:', error);
        return res.status(500).send('Internal server error');
    }
}

const getCompletedTasks = async (req, res) => {
    try {
        const result = await tasksData.getCompletedTasks();
        return res.status(200).send(result);
    }
    catch (error) {
        console.error('Error getCompletedTasks:', error);
        return res.status(500).send('Internal server error');
    }
}

const getPendingTasks = async (req, res) => {
    try {
        const result = await tasksData.getPendingTasks();
        return res.status(200).send(result);
    }
    catch (error) {
        console.error('Error getPendingTasks:', error);
        return res.status(500).send('Internal server error');
    }
}


const getToDoTasks = async (req, res) => {
    try {
        const result = await tasksData.getToDoTasks();
        return res.status(200).send(result);
    }
    catch (error) {
        console.error('Error getToDoTasks:', error);
        return res.status(500).send('Internal server error');
    }
}

const updateTask = async (req, res) => {
    try {
        const task = {
            id_tasks: req.params.id,
            name: req.body.name ? req.body.name : null,
            description: req.body.description ? req.body.description : null,
            points: req.body.points ? req.body.points : null,
            user_id: req.body.user_id ? req.body.user_id : null,
            id_admin: req.body.id_admin ? req.body.id_admin : null,
            verified: req.body.verified ? req.body.verified : null,
            done: req.body.done ? req.body.done : null
        }
        console.log('task:', task);
        const result = await tasksData.updateTask(task);
        return res.status(200).send(result);
    } catch (error) {
        console.error('Error updateTask:', error);
        return res.status(500).send('Internal server error');
    }
}

module.exports = {getTaskByUserId, getTaskByAdminId, insertTask, deleteTask, getAllTasks, 
                getCompletedTasks, getPendingTasks, getToDoTasks, updateTask};
