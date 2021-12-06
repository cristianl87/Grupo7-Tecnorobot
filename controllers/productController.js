const express = require('express');
const productos = require('../productos');

const productController = {
    detail: (req, res) => {
        res.render('./products/productDetail');
    },

    productEdit: (req, res) => {
        const id = req.params.id;
        const producto = productos.filter( producto => producto.id == id);
        res.render('productEdit', {producto: producto});
    },
}

module.exports = productController;