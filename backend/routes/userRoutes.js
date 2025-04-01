const express = require('express');
const { verifyOtp, check } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/check',authMiddleware, check);
router.post('/otp-verified', verifyOtp);

module.exports = router;