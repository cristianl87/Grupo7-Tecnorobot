const express = require('express');
const router = express.Router();
const adminDashController = require('../controllers/adminDashController');

router.get('/', adminDashController.adminDashboard);

module.exports = router;