const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
var cors = require('cors')

// RUTAS
const mainRoutes = require('./routes/main');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productRoute = require('./routes/product');
const carritoRoute = require('./routes/carrito.js');
const perfilRoute = require('./routes/perfil');
const adminDashRoute = require('./routes/adminDash');
const userRoute =  require('./routes/userRoute');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const currenciesRoute= require('./routes/currencies');
const apiRoute= require('./routes/api');

app.use(methodOverride('_method'));
app.use(session({
    secret: 'tecnorobot',
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


app.use('/', mainRoutes);

//app.use('/login', loginRoute);

app.use('/user', userRoute);

//app.use('/register', registerRoute);

app.use('/products', productRoute);

app.use('/carrito', carritoRoute);

//app.use('/perfil', perfilRoute);

app.use('/adminDash', adminDashRoute);

app.use('/users', userRoute);

app.use('/currencies', currenciesRoute);

app.use('/api', apiRoute);

app.use((req, res, next) => {
    res.status(404).render('404');
   })
   


app.listen(process.env.PORT || 4000, () =>{
    console.log('servidor corriendo en el puerto 4000')
})