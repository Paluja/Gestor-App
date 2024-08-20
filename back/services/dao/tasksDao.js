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
            id_admin: taskData.id_admin
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
        const result = await db.query( `UPDATE tasks SET name = ?, description = ?, points = ?, user_id = ?, id_admin = ? WHERE id_tasks = ?;`,
        [taskData.name, taskData.description, taskData.points, taskData.user_id, taskData.id_admin, taskData.id_tasks],'update',conn);
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