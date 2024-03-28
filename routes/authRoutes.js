const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

// POST /api/register
// Register a new user
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  authController.register
);

// POST /api/login
// User login
router.post('/login', authController.login);

// GET /api/user/profile
// Get user profile (protected route)
router.get('/user/profile', authenticate, (req, res) => {
  res.json({ userId: req.userId });
});

module.exports = router;
