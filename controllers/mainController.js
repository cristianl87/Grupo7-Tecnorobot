const fs = require('fs');
const path = require('path');
const db = require('../src/database/models');
const folderData = path.join(__dirname, '../data');
// const productsJSON = fs.readFileSync(folderData + '/products.json', 'utf-8');
// let products = JSON.parse(productsJSON);

// const publishedProducts = products.filter(product => product.published === true);

// const featuredProducts = publishedProducts.filter( product => product.featured === true);
// const featuredQuantityProducts = 10;
// const featuredProductsToFront = featuredProducts.slice(0, featuredQuantityProducts);


// const newProductsQuantity = 10;
// const productsOrderedByDate = publishedProducts.sort(function(a, b) {
//     const [dayA, monthA, yearA] = a.date.split('/');
//     const [dayB, monthB, yearB] = b.date.split('/');
  
//     return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
//   });
// const productsOrderedByDateToFront = productsOrderedByDate.slice(0, newProductsQuantity);

const mainController = {
    index: async (req, res) => {

        const featuredProducts = db.Product.findAll({
            include: [
                {association: 'category'},
                {association: 'currency'}
            ],
            where: {
                isPublished: true,
                isFeatured: true,
                isDeleted: false
            },
            limit: 10
        });

        const newProducts = db.Product.findAll({
            include: [
                {association: 'category'},
                {association: 'currency'}
            ],
            where: {
                isPublished: true,
            },
            limit: 10,
            order: [
                ['createdAt', 'DESC']
            ]
        });

        try {
            
            const queryResult = await Promise.all([featuredProducts, newProducts]);

            res.render('index', {
                products: queryResult[0],
                newProducts: queryResult[1],
                userLogueado: req.session.userLogueado
            });

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = mainController;