function userLoggedMiddleware (req, res, next) {
    if (req.session.userLogueado){
        res.locals.userLogged = req.session.userLogueado;
    }
    next();
}

module.exports = userLoggedMiddleware;

//cookies
/*const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogueado = false;

	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);

	if (userFromCookie) {
		req.session.userLogueado = userFromCookie;
	}

	if (req.session.userLogueado) {
		res.locals.isLogged = true;
		res.locals.userLogueado = req.session.userLogueado;
	}

	next();
}

module.exports = userLoggedMiddleware;*/