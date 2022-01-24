

function guestMiddleware(req, res, next) {
	if (req.session.userLogueado) {
		return res.redirect('/perfil');
	}
	next();
}

module.exports = guestMiddleware;