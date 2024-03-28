// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   // Get token from header
//   const token = req.header('Authorization');

//   // Check if token doesn't exist
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   // Verify token
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };


const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Check if token doesn't exist
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      // Other unexpected errors
      console.error('Error verifying token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
