const express=require('express');
const productos=require('../productos');

const adminDashboard={
    adminDashboard: (req, res) => {
        res.render('./products/adminDashboard', {listadoProductos: productos})
    }
}

module.exports=adminDashboard;