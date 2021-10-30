const session = require("express-session");
const config = {
	cookie: {},
	secret: "my secret cat",
	resave: false,
	saveUninitialized: false,
};

module.exports = session(config);
