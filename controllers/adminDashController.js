const db = require('../src/database/models');
const fs = require('fs');
const path = require('path');
const folderData = path.join(__dirname, '../data');
const productsJSON = fs.readFileSync(folderData + '/products.json', 'utf-8');
const products = JSON.parse(productsJSON);

const adminDashboard={
    adminDashboard: async (req, res) => {
        try {
            const allProducts = await db.Product.findAll({
                include: [
                    {association: 'category'},
                    {association: 'currency'}
                ],
                where: {
                    isDeleted: false
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
    
            res.render('./admin/adminDashboard', {listadoProductos: allProducts});
        } catch (error) {
            console.log(error);
        }
    },
    settings: (req, res) => {
        res.send('test')
    },
    papelera: async (req, res) => {
        try {
            const deletedProducts = await db.Product.findAll({
                include: [
                    {association: 'category'},
                    {association: 'currency'}
                ],
                where: {
                    isDeleted: true
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            });
    
            res.render('./admin/adminDashboard', {listadoProductos: deletedProducts});
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports=adminDashboard;