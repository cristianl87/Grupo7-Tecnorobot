const express = require('express');
const productos = require('../productos');

const productController = {
    detail: (req, res) => {
        res.render('./products/productDetail');
    },
    addProduct: (req, res) => {
        const {nombre, precio, categoria, disponible, imagen} = req.body;
        const producto = {
            nombre,
            precio,
            categoria,
            disponible,
            imagen
        }
        productos.unshift(producto);
        res.redirect('/adminDash');
    }
}

module.exports = productController;