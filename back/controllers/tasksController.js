const tasksData = require('../services/dao/tasksDao');
const { SignJWT, jwtVerify } = require('jose');
const md5 = require('md5');



const getTaskByUserId = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    try {
        const encoder = new TextEncoder();
        const { payload }  = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const tasks = await tasksData.getTaskByUserId(payload.id_users);
        return res.status(200).send(tasks);
    } catch (error) {
        if (error.code === 'ERR_JWT_EXPIRED') {
            console.error('JWT expired:', error);
            return res.status(401).send('Token expired');
        }
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
    
    try {
        
        const task = {
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            user_id: req.body.user_id,
            id_admin: payload.id_admin
        }
        const result = await tasksData.insertTask(task);
        return res.status(200).send(result);
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


module.exports = {getTaskByUserId, getTaskByAdminId, insertTask, deleteTask, getAllTasks};
