const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/logout', authMiddleware, userController.logout);

module.exports = router;