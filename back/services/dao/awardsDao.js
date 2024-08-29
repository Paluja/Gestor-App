const db = require("../db");
const awardsDao = {};

awardsDao.getAwards = async () => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`SELECT * FROM awards`, [], 'select', conn);
        return result;
    } catch (error) {
        console.error("Error getAwards: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
};

awardsDao.getAwardsById = async (id) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`SELECT * FROM awards WHERE id_award = ?`, [id], 'select', conn);
        return result;
    } catch (error) {
        console.error("Error getAwardsById: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}

awardsDao.getAchivedAwards = async () => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`SELECT * FROM awards WHERE achived = 1`,[],'select', conn);
        return result;
    } catch (error) {
        console.error("Error getAchivedAwards: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}

awardsDao.getUnachivedAwards = async () => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`SELECT * FROM awards WHERE achived = 0`,[],'select', conn);
        return result;
    } catch (error) {
        console.error("Error getUnachivedAwards: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}

awardsDao.insertAward = async (awardData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let awardObj = {
            name: awardData.name,
            description: awardData.description,
            total_points: awardData.total_points,
            id_admin: awardData.id_admin

        }
        const result = await db.query(`INSERT INTO awards SET ?`, awardObj, 'insert', conn);
        return result;
    } catch (error) {
        console.error("Error insertAward: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}

awardsDao.addPoints = async (id, points) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`UPDATE awards SET points_earned = points_earned + ? WHERE id_award = ?`, [points, id], 'update', conn);
        return result;
    } catch (error) {
        console.error("Error addPoints: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}

awardsDao.achiveAwards = async (id_user,id_task) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`Call UpdateUserPointsAndAwards(?,?); `, [id_user,id_task], 'call', conn);
        return result;
    } catch (error) {
        console.error("Error achiveAwards: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}

awardsDao.revokeAwards = async (id_user,id_task) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const result = await db.query(`Call ReverseUserPointsAndAwards(?,?); `, [id_user,id_task], 'call', conn);
        return result;
    } catch (error) {
        console.error("Error revokeAwards: ", error);
        throw new Error(error.message);
    } finally {
        conn && conn.end();
    }
}

module.exports = awardsDao;