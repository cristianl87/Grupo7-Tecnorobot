

function guestMiddleware(req, res, next) {
	if (req.session.userLogueado) {
		return res.redirect('/user/profile');
	}
	next();
}

module.exports = guestMiddleware;