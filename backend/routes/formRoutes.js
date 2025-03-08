const express = require('express');
const { addBidd, getAllBids } = require('../controllers/formControlllers');

const router = express.Router();

// Admin endpoints
router.post('/', addBidd);
router.get('/', getAllBids);
// router.patch('/:id/read', markAsRead);

module.exports = router;