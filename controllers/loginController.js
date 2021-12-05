const express = require('express');

const loginController = {
    index: (req, res) => {
        res.render('login');
    }
}

module.exports = loginController;