const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.detail);

router.post('/add-product', productController.addProduct);

module.exports = router;