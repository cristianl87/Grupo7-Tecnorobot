const fs = require('fs');
const path = require('path');
const folderData = path.join(__dirname, '../data');
const productsJSON = fs.readFileSync(folderData + '/products.json', 'utf-8');
let products = JSON.parse(productsJSON);

const productController = {
    list: (req, res) => {
        publishedProducts = products.filter( product => product.published === true); //Envío a la vista solo los productos con publicado = true.
        res.render('./products/productList', {products: publishedProducts});
    },
    detail: (req, res) => {
        const productId = req.params.id;
        const productObj = products.filter( product => product.id === productId)
        res.render('./products/productDetail', {product: productObj[0]});
    },
    createGET: (req, res) => {
        res.render('./products/productCreate.ejs')
    },
    createPOST: (req, res) => {
        const id = Date.now();
        let image;
        if(req.file) {
            image = '/images/products/' + req.file.filename;
        };
        const defaultImg = '/images/default.png'
        const date = new Date().toLocaleDateString();
        let {name, currency, price, category, freeShipping, published, description} = req.body;

        //Convierto string a boolean
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
            image: image || defaultImg,
            description,
            date
        }
        products.unshift(productObj);
        const productString = JSON.stringify(products);
        fs.writeFileSync(folderData + '/products.json', productString);
        res.redirect('/adminDash');
    },
    editGET: (req, res) => {
        const productId = Number(req.params.id);
        const productObj = products.filter( product => product.id === productId)
        res.render('./products/productEdit', {product: productObj[0]});

    },
    editPUT: (req, res) => {
        const id = Number(req.params.id);
        let {name, currency, price, category, freeShipping, published, description} = req.body;
        let image;
        if(req.file) {
            image = '/images/products/' + req.file.filename;
        };
        //Convierto string a boolean
        freeShipping === 'true' ? freeShipping = true : freeShipping = false;
        published === 'true' ? published = true : published = false;

        products.forEach( product => {
            if(product.id === id) {
                product.name = name;
                product.currency = currency;
                product.price = price;
                product.category = category;
                product.freeShipping = freeShipping;
                product.published = published;
                product.image = image || product.image;
                product.description = description

                const productString = JSON.stringify(products);
                fs.writeFileSync(folderData + '/products.json', productString);
                res.redirect('/adminDash');
            }
        });
    },
    delete: (req, res) => {
        const id = Number(req.params.id);
        const product = products.filter( product => product.id === id); //Guardo referencia para eliminar imagen
        const image = product[0].image;
        products = products.filter( product => product.id != id);
        const productString = JSON.stringify(products);
        fs.writeFileSync(folderData + '/products.json', productString);
        fs.unlink(path.join(__dirname, '../public') + image, (err) => {
            if (err) {
              console.error(err)
              return
            }
        });
        res.redirect('/adminDash');
    }
}

module.exports = productController;