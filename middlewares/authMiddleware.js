function authMiddleware(req, res, next) {
	if (!req.session.userLogueado) {
		return res.redirect('./user/login');
	}
	next();
}

module.exports = authMiddleware;