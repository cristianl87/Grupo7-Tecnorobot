const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { body } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware')

const loginValidation = [
    body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
    body('password').notEmpty().withMessage('Debes introducir una contraseña')
];

router.get('/', guestMiddleware,loginController.login);

router.post('/', loginValidation, loginController.processLogin);

module.exports = router;