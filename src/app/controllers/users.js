const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { httpServerError, httpBadRequestError, httpConflictError } = require("../helpers/httpError");

const getItem = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await userModel.findOne({ cedula: id });

		res.status(data !== null ? 200 : 404);
		res.send(data);
	} catch (e) {
		httpServerError(res, e);
	}
};

const getItems = async (req, res) => {
	try {
		const data = await userModel.find({});
		res.send(data);
	} catch (e) {
		httpServerError(res, e);
	}
};

const createItem = async (req, res) => {
	try {
		const { cedula, nombre, email, username, password } = req.body;
		const salt = await bcrypt.genSalt(8);
		const hash = await bcrypt.hash(password, salt);
		const details = await userModel.create({ cedula, nombre, email, username, password: hash });
		res.sendStatus(201);
	} catch (e) {
		if (e.code === 11000) {
			httpConflictError(res, Object.keys(e.keyValue)[0]);
			return;
		}

		if (e.errors !== null) {
			httpBadRequestError(res, Object.keys(e.errors));
			return;
		}
		httpServerError(res, e);
	}
};

const updateItem = async (req, res) => {
	try {
		const { cedula, nombre, email, username, password } = req.body;
		const details = await userModel.findOneAndUpdate({ cedula }, { cedula, nombre, email, username, password });

		res.sendStatus(details !== null ? 200 : 404);
	} catch (e) {
		if (e.code === 11000) {
			httpConflictError(res, Object.keys(e.keyValue)[0]);
			return;
		}
		httpServerError(res, e);
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id } = req.params;
		const details = await userModel.findOneAndDelete({ cedula: id });

		res.sendStatus(details !== null ? 200 : 404);
	} catch (e) {
		httpServerError(res, e);
	}
};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
