const express = require('express');
const { addBidd, getAllBids, getBid } = require('../controllers/formControlllers');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin endpoints
router.post('/',authMiddleware, addBidd);
router.get('/',authMiddleware, getAllBids);
router.get('/form',authMiddleware, getBid);
// router.patch('/:id/read', markAsRead);

module.exports = router;