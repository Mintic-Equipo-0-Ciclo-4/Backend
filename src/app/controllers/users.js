const userModel = require("../models/users");
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
		const details = await userModel.create({ cedula, nombre, email, username, password });
		res.sendStatus(200);
	} catch (e) {
		if (e.code === 11000) {
			httpConflictError(res, Object.keys(e.keyValue)[0]);
			return;
		}
		httpServerError(res, e);
	}
};

const updateItem = (req, res) => {};

const deleteItem = (req, res) => {};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
