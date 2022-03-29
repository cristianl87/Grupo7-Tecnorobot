const express = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const router = express.Router();

//api de users
router.get('/users', userController.listAll);
router.get('/users/:id', userController.getOne);

//api de products
router.get('/products', productController.listadoProducts);
router.get('/products/:id', productController.detalleProducts);

router.get('/products-2', productController.listadoProducts2);


module.exports = router;