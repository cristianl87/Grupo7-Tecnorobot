const express = require('express');
const router = express.Router();
const adminDashController = require('../controllers/adminDashController');
const productController = require('../controllers/productController');

router.get('/', adminDashController.adminDashboard);

module.exports = router;