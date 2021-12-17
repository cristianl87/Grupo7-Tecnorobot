const fs = require('fs');
const path = require('path');
const folderData = path.join(__dirname, '../data');
const productsJSON = fs.readFileSync(folderData + '/products.json', 'utf-8');
const products = JSON.parse(productsJSON);

const adminDashboard={
    adminDashboard: (req, res) => {
        res.render('./admin/adminDashboard', {listadoProductos: products});
    },
    settings: (req, res) => {
        res.send('hola')
    }
}

module.exports=adminDashboard;