const express = require('express');
const { saveGameData, gameHistoryData, saveGameResults, gameHistoryByUser } = require('../controllers/memoryController');
const { validateUserSession } = require('../middlewares/memoryRoute.validator');
const router = express.Router();

// Assuming the fact that those endpoints will be used by the User Not by admin
// In case of admin I also have a userId middleware ready to control user behaviour 

router.use(validateUserSession)

// Route to save game data
router.post('/save', saveGameData);

// Route to fetch all game history
router.get('/history', gameHistoryData)

// Route to fetch all game history by userId
router.get('/history/self', gameHistoryByUser)

// Route to save game results
router.post('/save/results', saveGameResults)

module.exports = router;
