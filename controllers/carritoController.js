const express = require('express');

const carritoController = {
    index: (req, res) => {
        res.render('productCart');
    }
}

module.exports = carritoController;