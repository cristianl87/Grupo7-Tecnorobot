const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/logout', userController.logout);

module.exports = router;