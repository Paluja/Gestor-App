const express = require('express');
const awardsRouter = express.Router();
const { getAllAwards, getAwardById, getAchivedAwards, 
    getUnachivedAwards, insertAward, addPoints, achiveAwards } = require('../controllers/awardsController');

awardsRouter.get('/all', getAllAwards);
awardsRouter.get('/award/:id', getAwardById);
awardsRouter.get('/achived', getAchivedAwards);
awardsRouter.get('/unachived', getUnachivedAwards);
awardsRouter.post('/add-award', insertAward);
awardsRouter.put('/add-points', addPoints);
awardsRouter.put('/achive-awards', achiveAwards);


module.exports = awardsRouter;