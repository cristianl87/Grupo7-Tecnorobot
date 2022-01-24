function userLoggedMiddleware (req, res, next) {
    if (req.session.userLogueado){
        res.locals.userLogged = req.session.userLogueado;
    }
    next();
}

module.exports = userLoggedMiddleware;