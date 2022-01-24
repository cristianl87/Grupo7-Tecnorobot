const express = require('express');
const router = express.Router();
const adminDashController = require('../controllers/adminDashController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/',authMiddleware , adminDashController.adminDashboard);

router.get('/settings', adminDashController.settings);

module.exports = router;