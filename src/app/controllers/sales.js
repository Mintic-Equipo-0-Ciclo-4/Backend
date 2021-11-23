const saleModel = require("../models/sales");
const { httpServerError, httpBadRequestError, httpConflictError } = require("../helpers/httpError");

const getItem = async (req, res) => {
	try {
		const { id } = req.params;
		const details = await saleModel.findOne({ consecutivo: id });
		res.status(details !== null ? 200 : 404);
		res.send(details);
	} catch (e) {
		httpServerError(req, e);
	}
};

const getByClientItem = async (req, res) => {
	try {
		const { id } = req.params;
		const details = await saleModel.find({ cedula: id });
		res.status(details !== null ? 200 : 404);
		res.send(details);
	} catch (e) {
		httpServerError(req, e);
	}
};

const getItems = async (req, res) => {
	try {
		const data = await saleModel.find({});
		res.send(data);
	} catch (e) {
		httpServerError(res, e);
	}
};

const createItem = async (req, res) => {
	try {
		let details = await saleModel.create(req.body);
		res.sendStatus(201);
	} catch (e) {
		if (e.code === 11000) {
			httpConflictError(res, Object.keys(e.keyValue)[0]);
			return;
		}

		if (e.errors !== undefined) {
			console.log(e.errors);
			httpBadRequestError(res, Object.keys(e.errors));
			return;
		}
		httpServerError(res, e);
	}
};

const deleteItems = async (req, res) => {
	try {
		const details = await saleModel.deleteMany({});
		if (res !== undefined) res.sendStatus(200);
	} catch (e) {
		httpServerError(res, e);
	}
};

module.exports = { getItem, getItems, getByClientItem, createItem, deleteItems };
