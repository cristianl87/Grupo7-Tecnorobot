const express = require('express');
const app = express();
const path = require('path');

// RUTAS
const mainRoutes = require('./routes/main');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productRoute = require('./routes/product');
const carritoRoute = require('./routes/carrito.js');
const perfilRoute = require('./routes/perfil');
const adminDashRoute = require('./routes/adminDash');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);

app.use('/login', loginRoute);

app.use('/register', registerRoute);

app.use('/producto', productRoute);

app.use('/carrito', carritoRoute);

app.use('/perfil', perfilRoute);

app.use('/adminDash', adminDashRoute);


app.listen(3000, () => console.log("Server corriendo en puerto 3000"));