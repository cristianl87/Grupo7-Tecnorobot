const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routes/main');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productRoute = require('./routes/product');
const carritoRoute = require('./routes/carrito.js')

app.use(express.static(__dirname + '/public'));

app.use('/', mainRoutes);

app.use('/login', loginRoute);

app.use('/register', registerRoute);

app.use('/producto', productRoute);

app.use('/carrito', carritoRoute);



app.listen(3000, () => console.log("Server corriendo en puerto 3000"));