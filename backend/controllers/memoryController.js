const Save = require('../models/save');
const GameResults = require('../models/gameResults')
const { z } = require('zod');

const gameResultsSchema = z.object({
    userID: z.string().min(1, "User ID is required"),
    gameDate: z.string().min(1, "Game date is required"),
    failed: z.boolean(),
    difficulty: z.enum(['Easy', 'Normal', 'Hard']),
    completed: z.boolean(),
    timeTaken: z.number().min(0),
});

exports.saveGameData = async (req, res) => {
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;

    console.log('Received data to save:', req.body); 

    try {
       
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newSave.save(); 
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

exports.gameHistoryData = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query; 

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const historyData = await GameResults.find().select('-__v').skip(skip).limit(limit);
        const totalRecords = await GameResults.countDocuments();

        if (historyData.length === 0) {
            return res.status(404).json({ message: 'No game history found' });
        }

        res.status(200).json({
            message: 'Game history fetched successfully',
            data: historyData,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
                totalRecords,
            }
        });
    } catch (error) {
        console.error('Error fetching game history:', error);
        res.status(500).json({ message: 'Error fetching game history', error });
    }
};

exports.saveGameResults = async (req, res) => {
    console.log('Received game results:', req.body);

    try {
        const parsedData = gameResultsSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({ message: 'Invalid data', errors: parsedData.error.errors });
        }

        const newGameResult = new GameResults(parsedData.data);

        await newGameResult.save(); 
        res.status(201).json({ message: 'Game results saved successfully', data: newGameResult });
    } catch (error) {
        console.error('Error saving game results:', error);
        res.status(500).json({ message: 'Error saving game results', error });
    }
};

exports.gameHistoryByUser = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const historyData = await GameResults.find({ userID: req.user._id })
            .select('-__v')
            .skip(skip)
            .limit(limit);

        const totalRecords = await GameResults.countDocuments({ userID: req.user._id });

        if (historyData.length === 0) {
            return res.status(404).json({ message: 'No game history found for this user' });
        }

        res.status(200).json({
            message: 'User game history fetched successfully',
            data: historyData,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
                totalRecords,
            }
        });
    } catch (error) {
        console.error('Error fetching user game history:', error);
        res.status(500).json({ message: 'Error fetching user game history', error });
    }
};
