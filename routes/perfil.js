const express = require('express');
const router = express.Router();
const perfilController= require('../controllers/perfilController');
const userAutenticado = require('../middlewares/userAutenticado');

router.get('/', perfilController.perfil);

module.exports = router;