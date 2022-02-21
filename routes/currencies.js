const express = require('express');
const router = express.Router();

const currenciesController = require('../controllers/currenciesController');
//rutas de currencies


router.get('/', currenciesController.listar)

//create
router.get('/add', currenciesController.add );
router.post('/add',currenciesController.create);

//update
router.get('/edit/:id',currenciesController.edit);
router.post('/edit/:id',currenciesController.update);


//delete
router.post('/delete/:id',currenciesController.delete );

module.exports = router;