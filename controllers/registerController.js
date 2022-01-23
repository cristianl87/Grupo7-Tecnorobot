const { validationResult } = require('express-validator' );
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const registerController = {
    index: (req, res) => {
        res.render('./users/register');
    },
    register: (req, res) => {
        let errors = validationResult(req);
        let newUser;
        if(errors.isEmpty()) {
            
            if( User.findByField('email', req.body.email).length === 0 ) {
                newUser = {
                    id: Date.now(),
                    rol: 2,
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password, 10)
                }
                delete newUser.password_confirm;

                User.create(newUser)
                    req.session.registerMessage = 'Usuario creado correctamente';
                    res.redirect('/login');

            } else {
                res.render('./users/register', {
                    errors:{
                        email: {
                            msg: 'Este correo ya se encuentra registrado'
                        }
                    },
                    old: req.body
                });
            }

        } else {
            res.render('./users/register', {
                errors: errors.mapped(),
                old: req.body
            });
        }

    }
}

module.exports = registerController;