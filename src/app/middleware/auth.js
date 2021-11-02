const checkAuth = (req, res, next) => {
	if (req.session.data === undefined) res.sendStatus(401);
	else next();
};

module.exports = checkAuth;
