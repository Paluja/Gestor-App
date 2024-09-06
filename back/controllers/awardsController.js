const { jwtVerify } = require('jose');
const awardData = require('../services/dao/awardsDao');
 

const getAllAwards = async (req, res) => {
    try {
        const awards = await awardData.getAwards();
        return res.status(200).send(awards);
    } catch (error) {
        console.error('Error getAllAwards:', error);
        return res.status(500).send('Internal server error');
    }
}

const getAwardById = async (req, res) => {
    try {
        const award = await awardData.getAwardsById(req.params.id);
        return res.status(200).send(award);
    } catch (error) {
        console.error('Error getAwardById:', error);
        return res.status(500).send('Internal server error');
    }
}

const getAchivedAwards = async (req, res) => {
    try {
        const awards = await awardData.getAchivedAwards();
        return res.status(200).send(awards);
    } catch (error) {
        console.error('Error getAchivedAwards:', error);
        return res.status(500).send('Internal server error');
    }
}

const getUnachivedAwards = async (req, res) => {
    try {
        const awards = await awardData.getUnachivedAwards();
        return res.status(200).send(awards);
    } catch (error) {
        console.error('Error getUnachivedAwards:', error);
        return res.status(500).send('Internal server error');
    }
}

const insertAward = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send('Unauthorized');
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const award = {
            name: req.body.name,
            description: req.body.description,
            total_points: req.body.total_points,
            id_admin: payload.id_admin
        }
        await awardData.insertAward(award);
        return res.status(200).send('Award added');
    } catch (error) {
        console.error('Error insertAward:', error);
        return res.status(500).send('Internal server error');
    }
}

const addPoints = async (req, res) => {
    try {
        const result = await awardData.addPoints(req.body.id, req.body.points);
        return res.status(200).send(result);
    } catch (error) {
        console.error('Error addPoints:', error);
        return res.status(500).send('Internal server error');
    }
}

const achiveAwards = async (req, res) => {
    try {
        const result = await awardData.achiveAwards(req.body.id_user, req.body.id_task);
        return res.status(200).send(result);
    } catch (error) {
        console.error('Error redeemAwards:', error);
        return res.status(500).send('Internal server error');
    }
}



module.exports = { getAllAwards, getAwardById, getAchivedAwards, getUnachivedAwards, 
                insertAward, addPoints, achiveAwards };