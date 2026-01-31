const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updatePassword,
    updateProfile
} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middleware/auth');

// User routes (protected) - ONLY THESE FOR NOW
router.get('/me', isAuthenticatedUser, getUserProfile);
router.put('/password/update', isAuthenticatedUser, updatePassword);
router.put('/me/update', isAuthenticatedUser, updateProfile);

module.exports = router;