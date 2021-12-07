const clientModel = require("../models/clients");
const { httpServerError, httpBadRequestError, httpConflictError } = require("../helpers/httpError");
const { verifyRequired, verifyUnique } = require("../helpers/databaseSecurity");

const getItem = async (req, res) => {
	try {
		const { id: cedula } = req.params;
		const client = await clientModel.findOne({ cedula });
		res.status(client !== null ? 200 : 404);
		res.send(client);
	} catch (e) {
		httpServerError(res, e);
	}
};

const getItems = async (req, res) => {
	try {
		const clients = await clientModel.find({});
		res.send(clients);
	} catch (e) {
		httpServerError(res, e);
	}
};

const createItem = async (req, res) => {
	try {
		const requiredFields = ["cedula", "telefono", "nombre", "email", "direccion"];
		const uniqueFields = ["cedula", "telefono", "email"];
		const client = (({ cedula, telefono, nombre, email, direccion }) => ({ cedula, telefono, nombre, email, direccion }))(
			req.body
		);

		const errorResponse = verifyRequired(client, requiredFields) || (await verifyUnique(client, uniqueFields, clientModel));
		if (errorResponse) return res.status(errorResponse.status).send(errorResponse);

		const created = clientModel.create(client);
		res.sendStatus(201);
	} catch (e) {
		httpServerError(res, e);
	}
};

const updateItem = async (req, res) => {
	try {
		const requiredFields = ["cedula"];
		const uniqueFields = ["telefono", "email"];
		const client = (({ cedula, telefono, nombre, email, direccion }) => ({ cedula, telefono, nombre, email, direccion }))(
			req.body
		);

		const errorResponse = verifyRequired(client, requiredFields) || (await verifyUnique(client, uniqueFields, clientModel));
		if (errorResponse) return res.status(errorResponse.status).send(errorResponse);

		const updated = await clientModel.updateOne({ cedula: client.cedula }, { ...client });

		res.sendStatus(updated.modifiedCount > 0 ? 201 : 404);
	} catch (e) {
		httpServerError(res, e);
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id: cedula } = req.params;
		const deleted = await clientModel.findOneAndDelete({ cedula });
		res.sendStatus(deleted !== null ? 200 : 404);
	} catch (e) {
		httpServerError(res, e);
	}
};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
