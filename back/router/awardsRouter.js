const express = require('express');
const awardsRouter = express.Router();
const { getAllAwards, getAwardById, getAchivedAwards, 
    getUnachivedAwards, insertAward, addPoints, achiveAwards, revokeAwards } = require('../controllers/awardsController');

awardsRouter.get('/all', getAllAwards);
awardsRouter.get('/award/:id', getAwardById);
awardsRouter.get('/achived', getAchivedAwards);
awardsRouter.get('/unachived', getUnachivedAwards);
awardsRouter.post('/add-award', insertAward);
awardsRouter.put('/add-points', addPoints);
awardsRouter.put('/achive-awards', achiveAwards);
awardsRouter.put('/revoke-awards', revokeAwards);

module.exports = awardsRouter;