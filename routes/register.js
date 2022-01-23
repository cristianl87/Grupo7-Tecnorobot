const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const { body } = require('express-validator');

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


router.get('/', registerController.index);

router.post('/', registerValidation, registerController.register);

module.exports = router;