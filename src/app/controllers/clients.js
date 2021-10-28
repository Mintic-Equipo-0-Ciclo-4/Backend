const clientModel = require("../models/clients");
const { httpServerError, httpBadRequestError, httpConflictError } = require("../helpers/httpError");

const getItem = async (req, res) => {
	try {
		const { id } = req.params;
		const detail = await clientModel.findOne({ cedula: id });
		res.status(detail !== null ? 200 : 404);
		res.send(detail);
	} catch (e) {
		httpServerError(res, e);
	}
};

const getItems = async (req, res) => {
	try {
		const detail = await clientModel.find({});
		res.send(detail);
	} catch (e) {
		httpServerError(res, e);
	}
};

const createItem = async (req, res) => {
	try {
		const { cedula, telefono, nombre, email, direccion } = req.body;
		const detail = await clientModel.create({ cedula, telefono, nombre, email, direccion });
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

const updateItem = (req, res) => {};
const deleteItem = (req, res) => {};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
