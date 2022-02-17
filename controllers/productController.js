const fs = require('fs');
const path = require('path');
const db = require('../src/database/models');
const folderData = path.join(__dirname, '../data');

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

        let isFeatured;
        req.body.isFeatured ? isFeatured = true : isFeatured = false;

        let mainImage;
        req.files.mainImage ? mainImage = '/images/products/' + req.files.mainImage[0].filename : mainImage = undefined;

        let gallery = [];
        if(req.files.gallery) {
            const imagesGallery = req.files.gallery;
            imagesGallery.forEach( image => {
                gallery.push(image.filename);
            });
        }

        const defaultProductImage = '/images/default.png';
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
                mainImage: mainImage || defaultProductImage,
                gallery: JSON.stringify(gallery),
                isDeleted: false,
                description
            });

            res.redirect('/adminDash');

        } catch (error) {
            console.log(error);
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

        
    }
}

module.exports = productController;