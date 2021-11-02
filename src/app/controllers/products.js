const productModel = require("../models/products");
const { httpServerError, httpBadRequestError, httpConflictError } = require("../helpers/httpError");

const getItem = async (req, res) => {
	try {
		const { id } = req.params;
		const details = await productModel.findOne({ codigo: id });
		res.status(details !== null ? 200 : 404);
		res.send(details);
	} catch (e) {
		httpServerError(req, e);
	}
};

const getItems = async (req, res) => {
	try {
		const data = await productModel.find({});
		res.send(data);
	} catch (e) {
		httpServerError(res, e);
	}
};

const createItems = async (req, res) => {
	await deleteItems();
	try {
		const { productos } = req.body;

		for (producto of productos) {
			console.log(producto);
			let details = await productModel.create(producto);
		}
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
		httpServerError(res, e);
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id } = req.params;
		const details = await productModel.findOneAndDelete({ codigo: id });
		res.sendStatus(details !== null ? 200 : 404);
	} catch (e) {
		httpServerError(res, e);
	}
};

const deleteItems = async (req, res) => {
	try {
		const details = await productModel.deleteMany({});
		if (res !== undefined) res.sendStatus(200);
	} catch (e) {
		httpServerError(res, e);
	}
};

module.exports = { getItem, getItems, createItems, deleteItem, deleteItems };
