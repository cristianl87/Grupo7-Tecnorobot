const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.detail);

router.get('/adminDashboard/', productController.adminDashboard);

router.get('/adminDashboard/editar/:id', productController.productEdit);

module.exports = router;