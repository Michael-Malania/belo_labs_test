const { default: mongoose } = require('mongoose');
const User = require('../models/user'); // Ensure correct path to User model

const userIdMiddleware = async (req, res, next) => {

    const { userId } = req.params;

    if (!userId || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error while fetching user', error });
    }
};

module.exports = userIdMiddleware;
