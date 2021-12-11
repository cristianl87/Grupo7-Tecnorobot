const fs = require('fs');
const path = require('path');
const folderData = path.join(__dirname, '../data');
const productsJSON = fs.readFileSync(folderData + '/products.json', 'utf-8');
const products = JSON.parse(productsJSON);

const adminDashboard={
    adminDashboard: (req, res) => {
        res.render('./products/adminDashboard', {listadoProductos: products});
    }
}

module.exports=adminDashboard;