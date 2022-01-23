const express = require('express');
const app = express();
const methodOverride = require('method-override');


// RUTAS
const mainRoutes = require('./routes/main');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productRoute = require('./routes/product');
const carritoRoute = require('./routes/carrito.js');
const perfilRoute = require('./routes/perfil');
const adminDashRoute = require('./routes/adminDash');
const userRoute = require('./routes/userRoute');


app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);

app.use('/login', loginRoute);

app.use('/register', registerRoute);

app.use('/products', productRoute);

app.use('/carrito', carritoRoute);

app.use('/perfil', perfilRoute);

app.use('/adminDash', adminDashRoute);

app.use('/users', userRoute);

app.use((req, res, next) => {
    res.status(404).render('404');
   })
   


app.listen(process.env.PORT || 4000, () =>{
    console.log('servidor corriendo en el puerto 4000')
})