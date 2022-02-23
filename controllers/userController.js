const { validationResult } = require('express-validator' );
const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require('../src/database/models');


const userController = {
    register: (req, res) => {
        res.render('./users/register');
    },
    store: async (req, res) => {
        let errors = validationResult(req);

        let mailUsuario = req.body.email

        if(errors.isEmpty()) {

            try {
                const userByEmail = await db.User.findAll({where: {email: mailUsuario}});
                
                if(userByEmail.length == 0) {
                    db.User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        phone: null,
                        address: null,
                        avatar: null,
                        role_id: 2
                    });
                    
                    return res.render('./users/login');

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

            } catch (error) {
                console.log(error);
            }
            
        } else {
            res.render('./users/register', {
                errors: errors.mapped(),
                old: req.body
            });
        }

    },
    login: (req, res) => {
        res.render('./users/login')
    },
    processLogin: async (req, res) => {
        let errors = validationResult(req);
        const {email, password} = req.body;

        if (errors.isEmpty()){

            try {
                const usuarioByEmail = await db.User.findAll({where: {email: email}})
                if (usuarioByEmail[0]) {
                    if (bcryptjs.compareSync(password, usuarioByEmail[0].password)){
                        req.session.userLogueado = usuarioByEmail[0]
                        return res.redirect('/');
                    } else {
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
            }   catch (error) {
                console.log(error);
            }        

        } else {
            res.render('./users/login', {
                errors: errors.mapped(),
                old: req.body
            });
        }

    },
    detail: (req, res) => {
        res.render('./users/perfil', {userLogueado: req.session.userLogueado})
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = userController;