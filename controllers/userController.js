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
                        role_id: 1
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
    // editGET: async (req, res) => {
        
    //     const productId = Number(req.params.id);

    //     const currencies = db.Currency.findAll();
    //     const categories = db.Category.findAll();
    //     const productToEdit = db.Product.findByPk(productId, {
    //         include: [
    //             {association: 'category'},
    //             {association: 'currency'}
    //          ]
    //     });

    //     try {
    //         const queryResult = await Promise.all([currencies, categories, productToEdit]);
            
    //         res.render('./products/productEdit', {
    //             currencies: queryResult[0],
    //             categories: queryResult[1],
    //             product: queryResult[2],
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // editPUT: async (req, res) => {
    //     const id = Number(req.params.id);

    //     let {name, currency_id, price, category_id, freeShipping, isPublished, description} = req.body;
    //     let isFeatured = false;

    //     let mainImage;

    //     if(req.files.mainImage) {
    //         mainImage = '/images/products/' + req.files.mainImage.filename;
    //     };

    //     let gallery = [];
    //     if(req.files.gallery) {
    //         const imagesGallery = req.files.gallery;
    //         imagesGallery.forEach( image => {
    //             gallery.push(image.filename);
    //         });
    //     }
        
    //     if(req.body.isFeatured) {
    //         isFeatured = true;
    //     }

    //     //Convertimos string a boolean
    //     freeShipping === 'true' ? freeShipping = true : freeShipping = false;
    //     isPublished === 'true' ? isPublished = true : isPublished = false;

    //     try {

    //         const productToEdit = await db.Product.update({
    //             name,
    //             currency_id: Number(currency_id),
    //             price: Number(price),
    //             category_id: Number(category_id),
    //             freeShipping,
    //             isPublished,
    //             isFeatured,
    //             mainImage,
    //             gallery: JSON.stringify(gallery),
    //             description
    //         },
    //         {
    //             where: {id: id}
    //         });

    //         res.redirect('/adminDash');

    //     } catch (error) {

    //         console.log(error);
            
    //     }
    // }
}

module.exports = userController;