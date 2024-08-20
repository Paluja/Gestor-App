const db = require("../db");

const md5 = require("md5");

const userDao = {};


userDao.getUsers = async () => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`SELECT * FROM users;`, [], 'select', conn);
        return result;
    } catch (error) {
        console.error("Error getUsers: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}


userDao.getAdminByName = async (name) => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM users WHERE name = ?;`,[name],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getUserByName: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
};

userDao.getUserById = async (id) => {
    let conn = null;
    try{
        
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM users WHERE id_users = ?;`,[id],'select',conn);
        
        return result;
    } catch (error) {
        console.error("Error getUserByName: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
};



userDao.insertUser = async (userData) => {
    let conn = null;
    console.log(userData);
    try {
        conn = await db.createConnection();
        let userObj = {
            name: userData.name,
            passwd: userData.passwd ? md5(userData.passwd) : undefined,
            id_admin: userData.id_admin
        }
        const existingUser = await userDao.getAdminByName(userData.name);
        
        if(existingUser.length > 0){
            throw new Error('Miembro ya registrado');
        }
        const result = await db.query(`INSERT INTO users SET ?`, userObj,'insert', conn);
        return result;
    } catch (error) {
        console.error("Error insertUser: ", error);
        throw new Error(error.message);
    } finally {
        if (conn) await conn.end();
    }
};

//anyadir el md5 al passwd
userDao.login = async (name, passwd) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        console.log("name: ", name);
        console.log("passwd: ", passwd);
        const [result] = await db.query(`SELECT * FROM users WHERE name = ? AND passwd = ?`,[name, (passwd)],'select', conn);
        console.log('result',result);
        return result;
    } catch (error) {
        console.error("Error login: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
};

module.exports = userDao;