const bcrypt = require('bcryptjs/dist/bcrypt');
const { validationResult } = require('express-validator' );
const User = require('../models/User');

const loginController = {
    login: (req, res) => {
        res.render('./users/login', {registerMessage: req.session.registerMessage})
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            const {email, password} = req.body;
            const user = User.findByField('email', email);

            if(user.length > 0) {
                if(bcrypt.compareSync(password, user[0].password)){
                    req.session.userLogueado = user[0];
                    
                    return res.redirect('/');
                }
              
               
                else {
                    res.render('./users/login', {
                        credentialError: {msg: 'Credenciales inválidas'},
                        old: req.body
                    });
                }
            } else {
                res.render('./users/login', {
                    credentialError: {msg: 'Credenciales inválidas'},
                    old: req.body
                });
            }
        } else {
            res.render('./users/login', {
                errors: errors.mapped(),
                old: req.body
            });
        }
        
    }
}

module.exports = loginController;