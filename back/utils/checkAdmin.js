const db = require('../services/db');
const md5 = require("md5");

const checkAdmin = async (email,pass) => {
    try {
        const conn = await db.createConnection();
        const [result] = await db.query(`SELECT * FROM admin WHERE email = ? AND passwd = ?`,[email, md5(pass)],'select', conn);
        return result;
    } catch (error) {
        console.error("Error checkAdmin: ", error);
        throw new Error(error.message);
    }
}