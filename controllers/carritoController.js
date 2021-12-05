const express = require('express');
const path = require('path');

const carritoController = {
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/productCart.html'));
    }
}

module.exports = carritoController;