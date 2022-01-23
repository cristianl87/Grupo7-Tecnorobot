

function guestMiddleware(req, res, next) {
	if (req.session) {
		return res.redirect('/perfil');
	}
	next();
}

module.exports = guestMiddleware;