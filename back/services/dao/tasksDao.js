const db = require("../db");

const md5 = require("md5");

const tasksDao = {};

tasksDao.getTaskByUserId = async (id) => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM tasks WHERE user_id = ?;`,[id],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getByUserId: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
};

tasksDao.getByAdminId = async (id) => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM tasks WHERE admin_id = ?;`,[id],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getByAdminId: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
}

tasksDao.insertTask = async (taskData) => {
    let conn = null;
    console.log(taskData);
    try {
        conn = await db.createConnection();
        let taskObj = {
            name: taskData.name,
            description: taskData.description,
            points: taskData.points,
            user_id: taskData.user_id,
            admin_id: taskData.admin_id
        }
        const result = await db.query(`INSERT INTO tasks SET ?`, taskObj,'insert', conn);
        return result;
    } catch (error) {
        console.error("Error insertTask: ", error);
        throw new Error(error.message);
    } finally {
        if (conn) await conn.end();
    }
}

tasksDao.deleteTask = async (id) => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `DELETE FROM tasks WHERE id_tasks = ?;`,[id],'delete',conn);
        return result;
    } catch (error) {
        console.error("Error deleteTask: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
}

tasksDao.updateTask = async (taskData) => {
    let conn = null;
    try{
        conn = await db.createConnection();
        let query = 'UPDATE tasks SET ';
        const params = [];

        if (taskData.name !== null) {
            query += 'name = ?, ';
            params.push(taskData.name);
        }
        if (taskData.description!== null) {
            query += 'description = ?, ';
            params.push(taskData.description);
        }
        if (taskData.points!== null) {
            query += 'points = ?, ';
            params.push(taskData.points);
        }
        if (taskData.user_id!== null) {
            query += 'user_id = ?, ';
            params.push(taskData.user_id);
        }
        if (taskData.id_admin!== null) {
            query += 'id_admin = ?, ';
            params.push(taskData.id_admin);
        }
        if(taskData.verified!== null){
            query += 'verified = ?, ';
            params.push(taskData.verified);
        }
        if(taskData.done!== null){
            query += 'done = ?, ';
            params.push(taskData.done);
        }

        query = query.slice(0, -2);
        query += ' WHERE id_tasks = ?';
        params.push(taskData.id_tasks);

        const result = await db.query(query, params, 'update', conn);
        return result;
    } catch (error) {
        console.error("Error updateTask: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
}

tasksDao.getAllTasks = async () => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM tasks;`,[],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getAllTasks: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
}

tasksDao.getCompletedTasks = async () => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM tasks WHERE verified = 1 && done = 1;`,[],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getCompletedTasks: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
}

tasksDao.getPendingTasks = async () => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM tasks WHERE verified = 0 && done = 1;`,[],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getPendingTasks: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
}

tasksDao.getToDoTasks = async () => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM tasks WHERE done = 0 && verified = 0;`,[],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getToDoTasks: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
}

module.exports = tasksDao;