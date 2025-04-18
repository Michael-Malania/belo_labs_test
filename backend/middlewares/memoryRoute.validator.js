const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function validateUserSession(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await User.findById(decoded.id);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
    
    delete user.password; 
    
    req.user = user; 

    next();
  } catch (err) {
    console.log(err, 'error');
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
}

module.exports = {
  validateUserSession,
};
