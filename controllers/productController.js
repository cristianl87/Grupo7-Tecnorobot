const fs = require('fs');
const path = require('path');
const db = require('../src/database/models');
const folderData = path.join(__dirname, '../data');
const { validationResult } = require('express-validator' );

const papeleraJSON = fs.readFileSync(folderData + '/papelera.json', 'utf-8');
let papelera = JSON.parse(papeleraJSON);


const productController = {
    list: async (req, res) => {
        try {
            const publishedProducts = await db.Product.findAll({
                include: [
                    {association: 'category'},
                    {association: 'currency'}
                ],
                where: {
                    isPublished: true
                }
            });
    
            res.render('./products/productList', {products: publishedProducts});
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (req, res) => {
        const productId = Number(req.params.id);
        try {
            const productById = await db.Product.findByPk(productId, {
                include: [
                    {association: 'category'},
                    {association: 'currency'}
                ]
            });
            if(productById) {
                res.render('./products/productDetail', {product: productById});
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    },
    createGET: async (req, res) => {
        const currencies = db.Currency.findAll();
        const categories = db.Category.findAll();

        try {
            const result = await Promise.all([currencies, categories]);
            res.render('./products/productCreate.ejs', {
                currencies: result[0],
                categories: result[1]
            });

        } catch (error) {
            console.log(error);
        }

    },
    createPOST: async (req, res) => {

        let errors = validationResult(req);
        const { mainImage, gallery } = req.files

        if ( !mainImage ) {
            const errorMain = {
                value: '',
                msg: 'La imagen principal es obligatoria',
                param: 'mainImage',
                location: 'files'
            } 
            errors.errors.push( errorMain )
        } else if ( !(mainImage[0].mimetype == 'image/png' || mainImage[0].mimetype == 'image/jpg' || mainImage[0].mimetype == 'image/jpeg' || mainImage[0].mimetype == 'image/gif')) {
            const errorMainExtension = {
                value: '',
                msg: 'Debes elegir un formato de imagen válido',
                param: 'mainImage',
                location: 'files'
            } 
            errors.errors.push( errorMainExtension )
        }

        if ( !gallery ) {
            const errorGallery = {
                value: '',
                msg: 'Tienes que cargar al menos una imagen para la galería',
                param: 'gallery',
                location: 'files'
            } 
            errors.errors.push( errorGallery )
        }

        if ( errors.isEmpty() ) {
            let isFeatured;
            req.body.isFeatured ? isFeatured = true : isFeatured = false;

            let mainImage = '/images/products/' + req.files.mainImage[0].filename;

            let gallery = [];
            if(req.files.gallery) {
                const imagesGallery = req.files.gallery;
                imagesGallery.forEach( image => {
                    gallery.push(image.filename);
                });
            }

            let {name, currency_id, price, category_id, freeShipping, isPublished, description} = req.body;
        
            freeShipping === 'true' ? freeShipping = true : freeShipping = false;
            isPublished === 'true' ? isPublished = true : isPublished = false;

            try {
                const createProduct = await db.Product.create({
                    name,
                    currency_id: Number(currency_id),
                    price: Number(price),
                    category_id: Number(category_id),
                    freeShipping,
                    isPublished,
                    isFeatured,
                    mainImage: mainImage,
                    gallery: JSON.stringify(gallery),
                    isDeleted: false,
                    description
                });

                res.redirect('/adminDash');

            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const currencies = await db.Currency.findAll();
                const categories = await db.Category.findAll();


                console.log('El usuario metió la pata');
                console.log(errors)
                console.log(errors.mapped())
                res.render('./products/productCreate', {
                    errors: errors.mapped(),
                    old: req.body,
                    currencies,
                    categories
                });
                

            } catch (error) {
                console.log(error);
            }
        }
    },
    editGET: async (req, res) => {
        
        const productId = Number(req.params.id);

        const currencies = db.Currency.findAll();
        const categories = db.Category.findAll();
        const productToEdit = db.Product.findByPk(productId, {
            include: [
                {association: 'category'},
                {association: 'currency'}
             ]
        });

        try {
            const queryResult = await Promise.all([currencies, categories, productToEdit]);
            
            res.render('./products/productEdit', {
                currencies: queryResult[0],
                categories: queryResult[1],
                product: queryResult[2],
            });
        } catch (error) {
            console.log(error);
        }
    },
    editPUT: async (req, res) => {
        const id = Number(req.params.id);

        let {name, currency_id, price, category_id, freeShipping, isPublished, description} = req.body;
        let isFeatured = false;

        let mainImage;

        if(req.files.mainImage) {
            mainImage = '/images/products/' + req.files.mainImage.filename;
        };

        let gallery = [];
        if(req.files.gallery) {
            const imagesGallery = req.files.gallery;
            imagesGallery.forEach( image => {
                gallery.push(image.filename);
            });
        }
        
        if(req.body.isFeatured) {
            isFeatured = true;
        }

        //Convertimos string a boolean
        freeShipping === 'true' ? freeShipping = true : freeShipping = false;
        isPublished === 'true' ? isPublished = true : isPublished = false;

        try {

            const productToEdit = await db.Product.update({
                name,
                currency_id: Number(currency_id),
                price: Number(price),
                category_id: Number(category_id),
                freeShipping,
                isPublished,
                isFeatured,
                mainImage,
                gallery: JSON.stringify(gallery),
                description
            },
            {
                where: {id: id}
            });

            res.redirect('/adminDash');

        } catch (error) {

            console.log(error);
            
        }
    },
    delete: async (req, res) => {
        const id = Number(req.params.id);
        const productDeleted = await db.Product.update({
            isDeleted: true,
            isPublished: false
        },
        {
            where: {id}
        });

        res.redirect('/adminDash');

    },

    restore: async (req, res) => {
        const id = Number(req.params.id);
        const productRestored = await db.Product.update({
            isDeleted: false
        },
        {
            where: {id}
        });

        res.redirect('/adminDash');

         
    },

    //API DE PRODUCTOS

    
    detalleProducts: async (req, res) => {
        const id = Number(req.params.id);
        
        const product = await db.Product.findOne({
            include: [
                {association: 'category'},
                {association: 'currency'}
            ],
            attributes:  ['id', 'name','price', 'description','mainImage'],
            where: {
                id: id
            }
        });

        res.json(product)
    },

    /*listadoProducts: async (req, res) => {
        
            const products = await db.Product.findAll({
                include: [
                    {association: 'category'},
                    //{association: 'currency'}
                ],
               attributes:{exclude:['isDeleted','isFeatured','isPublished','freeShipping','createdAt', 'updatedAt','currency','gallery','currency_id','category_id']},
                where: {
                    isPublished: true
                }
            });
    
            res.json({
                count: products.length,
                products:products,
                status:200})
    },*/
    listadoProducts: async (req, res) => {
    const products = await db.Product.findAndCountAll({
        include: [
            {association: 'category'}],
        attributes: ['id', 'name','price', 'description'],
        where: {
            isPublished: true
        }
     
    });

    products.rows.map(product => {
        product.setDataValue("detail", `/api/products/${product.id}`);
        
    });

    res.json({
        products
        
    })
},

/*
    categories = await db.Producto.findAll({
        include: ["categoria"],
        attributes: ['categoria_id', [sequelize.fn("COUNT", "titulo"), "titulo_count"]],
        group: 'categoria_id'
    });
    productos = [];
    products.map(({ id, titulo, precio, descripcion, categoria }) => {
        productos.push({
            id,
            titulo,
            precio,
            descripcion,
            categoria,
            detail: `/api/products/${id}`,
        })
    })
    let count = 0
    categories.map( ({dataValues}) => {
        let { titulo_count } = dataValues;
        count += titulo_count
    })
    data.count = count;
    category = [];
    categories.map(({ dataValues }) => {
        let { categoria, titulo_count } = dataValues;
        category.push({
            category: categoria,
            quantity: titulo_count,
        })
    })
    data.countByCategory = category;
    data.products = productos;
    res.json(data);*/











}

module.exports = productController;