const express = require('express');
const path = require('path');

const productController = {
    detail: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/productDetail.html'));
    }
}

module.exports = productController;