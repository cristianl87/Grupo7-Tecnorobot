const express = require('express');
const router = express.Router();
const adminDashController = require('../controllers/adminDashController');
const userAdministrador = require('../middlewares/userAdministrador')

router.get('/', userAdministrador, adminDashController.adminDashboard);

router.get('/settings', adminDashController.settings);

router.get('/papelera', adminDashController.papelera);

module.exports = router;