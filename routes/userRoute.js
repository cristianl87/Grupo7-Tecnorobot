const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware')

const registerValidation = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
    body('password').notEmpty().withMessage('Debes introducir una contraseña').bail().isStrongPassword({minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1}).withMessage('La contraseña no cumple los requisitos mínimos'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contraseñas especificadas no coinciden');
        }
        return true;
      }),
];

const loginValidation = [
  body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
  body('password').notEmpty().withMessage('Debes introducir una contraseña')
];


router.get('/register', guestMiddleware, userController.register);

router.post('/register', registerValidation, userController.store);

router.get('/login', guestMiddleware, userController.login)

router.post('/login', loginValidation, userController.processLogin)

router.get('/profile', userController.detail);

router.get('/logout', authMiddleware, userController.logout);

module.exports = router;