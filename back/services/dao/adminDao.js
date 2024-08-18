const db = require("../db");
// const moment = require("moment");
const md5 = require("md5");

const adminDao = {};


adminDao.getAdminByEmail = async (email) => {
    let conn = null;
    try{
        conn = await db.createConnection();
        const result = await db.query( `SELECT * FROM admin WHERE email = ?;`,[email],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getByEmail: ", error);
        throw new Error(error.message);
    } finally{
        conn && conn.end();
    }
};


adminDao.getAdminById = async (id) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`SELECT * FROM admin WHERE id_admin = ?`,[id],'select',conn);
        return result;
    } catch (error) {
        console.error("Error getById: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
};


adminDao.insertAdmin = async (adminData) => {
    let conn = null;
    console.log(adminData);
    try {
        conn = await db.createConnection();
        let adminObj = {
            name: adminData.name,
            email: adminData.email,
            passwd: adminData.passwd ? md5(adminData.passwd) : undefined,
        }
        const existingAdmin = await adminDao.getAdminByEmail(adminData.email);
        
        if(existingAdmin.length > 0){
            throw new Error('Email ya registrado');
        }
        const result = await db.query(`INSERT INTO admin SET ?`, adminObj,'insert', conn);
        return result;
    } catch (error) {
        console.error("Error insertAdmin: ", error);
        throw new Error(error.message);
    } finally {
        if (conn) await conn.end();
    }
};


adminDao.login = async (email, passwd) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        console.log("email: ", email);
        console.log("passwd: ", passwd);
        const [result] = await db.query(`SELECT * FROM admin WHERE email = ? AND passwd = ?`,[email, (passwd)],'select', conn);
        console.log('result',result);
        return result;
    } catch (error) {
        console.error("Error login: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
};



module.exports = adminDao;