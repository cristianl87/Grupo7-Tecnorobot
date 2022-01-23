const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const Product = require('../models/Product');
const folderData = path.join(__dirname, '../data');
const productsJSON = fs.readFileSync(folderData + '/products.json', 'utf-8'); //Leemos archivo con productos.
let products = JSON.parse(productsJSON); //Convertimos de JSON a array de objetos.

const papeleraJSON = fs.readFileSync(folderData + '/papelera.json', 'utf-8');
let papelera = JSON.parse(papeleraJSON);

const categoriesJSON = fs.readFileSync(folderData + '/categories.json', 'utf-8'); //Leemos archivo con categorias.
let categories = JSON.parse(categoriesJSON); //Convertimos de JSON a array de objetos.

const productController = {
    list: (req, res) => {
        publishedProducts = products.filter( product => product.published === true); //Enviamos a la vista solo los productos. con publicado = true.
        res.render('./products/productList', {products: publishedProducts, categories: categories});
    },
    detail: (req, res) => {
        const productId = Number(req.params.id);
        const productObj = products.filter( product => product.id === productId) // Filtramos por el id que llega en la ruta.
        if(productObj.length > 0) {
            res.render('./products/productDetail', {product: productObj[0]});
        } else {
            res.redirect('/')
        }
    },
    createGET: (req, res) => {
        res.render('./products/productCreate.ejs')
    },
    createPOST: (req, res) => {
        const id = Date.now();
        let featured = false; // Creamos la variable featured, en el front es un input type="checkbox" y si no esta "checked" directamente no viene en el req.body
        let image;
        if(req.file) {
            image = '/images/products/' + req.file.filename; //Si viene una imagen asignamos la ruta de la misma a la variable image
        };
        if(req.body.featured) {
            featured = true;
        }
        const defaultImg = '/images/default.png' //Si noviene ninguna imagen para el producto, cargamos una por default.
        let {name, currency, price, category, freeShipping, published, description} = req.body;
        
        //Convertimos string a boolean usando operador ternario
        freeShipping === 'true' ? freeShipping = true : freeShipping = false;
        published === 'true' ? published = true : published = false;

        const productObj = {
            id,
            name,
            currency,
            price: Number(price),
            category,
            freeShipping,
            published,
            featured, 
            image: image || defaultImg,
            description,
            date: new Date().toLocaleDateString()
        }
        
        products.unshift(productObj); //Agregamos el objeto con el nuevo producto al array products
        const productString = JSON.stringify(products); //Convertimos el array products a JSON
        fs.writeFileSync(folderData + '/products.json', productString);
        res.render('./admin/adminDashboard', {listadoProductos: products});
    },
    editGET: (req, res) => {
        const productId = Number(req.params.id);
        const productObj = products.filter( product => product.id === productId)
        res.render('./products/productEdit', {product: productObj[0]}); //Enviamos el objeto a la vista para poder pre-rellenar los inputs y demas.
    },
    editPUT: (req, res) => {
        const id = Number(req.params.id);
        let {name, currency, price, category, freeShipping, published, description} = req.body;
        let featured = false;
        let image;

        if(req.file) {
            image = '/images/products/' + req.file.filename;
        };
        if(req.body.featured) {
            featured = true;
        }

        //Convertimos string a boolean
        freeShipping === 'true' ? freeShipping = true : freeShipping = false;
        published === 'true' ? published = true : published = false;

        products.forEach( product => {
            if(product.id === id) {

                // Si subo una nueva imagen, elimino la anterior.
                if(image != undefined) {
                    fs.unlink(path.join(__dirname, '../public') + product.image, (err) => {
                        if (err) {
                        console.error(err)
                        return
                        }
                    });
                }

                product.name = name;
                product.currency = currency;
                product.price = price;
                product.category = category;
                product.freeShipping = freeShipping;
                product.published = published;
                product.image = image || product.image;
                product.featured = featured;
                product.description = description

                const productString = JSON.stringify(products);
                fs.writeFileSync(folderData + '/products.json', productString);
                res.render('./admin/adminDashboard', {listadoProductos: products});
            }
        });
    },
    delete: (req, res) => {
        const id = Number(req.params.id);
        const product = products.filter( product => product.id === id); //Guardo referencia para eliminar imagen
        Product.aLaPapelera(product[0]);
        const image = product[0].image;
        products = products.filter( product => product.id != id);
        const productString = JSON.stringify(products);
        fs.writeFileSync(folderData + '/products.json', productString);
        // fs.unlink(path.join(__dirname, '../public') + image, (err) => {
        //     if (err) {
        //       console.error(err)
        //       return
        //     }
        // });
        res.render('./admin/adminDashboard', {
            listadoProductos: products,
            productoEliminado: product[0].id,
        });
    },

    restore: (req, res) => {
        const id = Number(req.params.id);
        const productToRestore = papelera.filter(product => product.id === id);
        Product.restoreProduct(productToRestore[0]);

        res.redirect('/adminDash')
        
    }
}

module.exports = productController;