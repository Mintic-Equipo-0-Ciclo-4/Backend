const userModel = require("../models/users");
const bcrypt = require("bcrypt");

const getItem = (req, res) => {
	res.status(req.session.data !== undefined ? 200 : 404);
	res.send(req.session.data);
};

const createItem = async (req, res) => {
	const { username, password } = req.body;
	const user = await userModel.findOne({ username });
	if (user) {
		const check = await bcrypt.compare(password, user.password);
		if (check) {
			const { cedula, nombre, email, username } = user;
			req.session.data = { cedula, nombre, email, username };
			res.status(201);
			res.send(null);
		} else res.sendStatus(401);
	} else {
		res.status(404);
		res.send(null);
	}
};

const deleteItem = (req, res) => {
	req.session.destroy();
	res.sendStatus(200);
};

module.exports = { getItem, createItem, deleteItem };
