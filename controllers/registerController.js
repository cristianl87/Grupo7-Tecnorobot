const express = require('express');

const registerController = {
    index: (req, res) => {
        res.render('register');
    }
}

module.exports = registerController;