function authMiddleware(req, res, next) {
	if (!req.session.userLogueado) {
		return res.redirect('./login');
	}
	next();
}

module.exports = authMiddleware;