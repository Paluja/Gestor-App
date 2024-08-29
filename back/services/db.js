const mysql = require('mysql2/promise');
require('dotenv').config();

let db = {};

// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PORT);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);

db.createConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host:process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            dateStrings: true
        });
        return connection;       
    } catch (error) {
        throw new Error(error.message);
    }
}

db.query = async (sqlQuery, params, type, conn) => {
    try {
      const [result] = await conn.query(sqlQuery, Array.isArray(params) ? params : [params])
      switch (type) {
        case 'select':
          return JSON.parse(JSON.stringify(result))
        case 'insert':
          return parseInt(result.insertId)
        case 'update':
          if (result.affectedRows > 0) {
            return true
          } else {
            return false
          }
        case 'call':
          return result
        case 'delete':
          if (result.affectedRows > 0) {
            return true
          } else {
            return false
          }
        default:
          throw new Error('Query type not matched')
      }
    } catch (error) {
      console.error('Query or database error: ', error)
      throw new Error(error.message)
    }
}

module.exports = db