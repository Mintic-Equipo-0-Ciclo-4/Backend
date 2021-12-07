const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { httpServerError } = require("../helpers/httpError");
const { verifyRequired, verifyUnique } = require("../helpers/databaseSecurity");

const getItem = async (req, res) => {
	try {
		const { id: cedula } = req.params;
		const user = await userModel.findOne({ cedula });

		res.status(user !== null ? 200 : 404).send(user);
	} catch (e) {
		httpServerError(res, e);
	}
};

const getItems = async (req, res) => {
	try {
		const users = await userModel.find({});
		res.send(users);
	} catch (e) {
		httpServerError(res, e);
	}
};

const createItem = async (req, res) => {
	try {
		const requiredFields = ["cedula", "nombre", "email", "password", "username"];
		const uniqueFields = ["cedula", "username", "email"];

		const user = (({ cedula, email, nombre, username, password }) => ({ cedula, email, nombre, username, password }))(req.body);
		const salt = await bcrypt.genSalt(8);
		user.password = await bcrypt.hash(user.password, salt);

		const errorResponse = verifyRequired(user, requiredFields) || (await verifyUnique(user, uniqueFields, userModel));
		if (errorResponse) return res.status(errorResponse.status).send(errorResponse);

		const created = userModel.create(user);
		res.sendStatus(201);
	} catch (e) {
		httpServerError(res, e);
	}
};

const updateItem = async (req, res) => {
	try {
		const requiredFields = ["cedula"];
		const uniqueFields = ["username", "email"];
		const user = (({ cedula, email, nombre, username }) => ({ cedula, email, nombre, username }))(req.body);

		const errorResponse = verifyRequired(user, requiredFields) || (await verifyUnique(user, uniqueFields, userModel));
		if (errorResponse) return res.status(errorResponse.status).send(errorResponse);

		const updated = await userModel.updateOne({ cedula: user.cedula }, { ...user });

		res.sendStatus(updated !== null ? 200 : 404);
	} catch (e) {
		httpServerError(res, e);
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id: cedula } = req.params;
		const deleted = await userModel.findOneAndDelete({ cedula });

		res.sendStatus(deleted !== null ? 200 : 404);
	} catch (e) {
		httpServerError(res, e);
	}
};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
