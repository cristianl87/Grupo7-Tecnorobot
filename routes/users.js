const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/logout/', usersController.logout);

module.exports = router;