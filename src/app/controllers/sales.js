const saleModel = require("../models/sales");
const { httpServerError, httpBadRequestError, httpConflictError } = require("../helpers/httpError");

//TODO: Corregir esto :P

const getItem = async (req, res) => {
	try {
		const { id: consecutivo } = req.params;
		const details = await saleModel.findOne({ consecutivo });
		res.status(details !== null ? 200 : 404);
		res.send(details);
	} catch (e) {
		httpServerError(req, e);
	}
};

const getByClientItem = async (req, res) => {
	try {
		const { id: cedula } = req.params;
		const details = await saleModel.find({ cedula });
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
		console.log("Usuario", req.session.data);
		let sale = (({ consecutivo, subtotal, totalIva, total, productos, cedula }) => ({
			consecutivo,
			sucursal: req.session.data.sucursal,
			subtotal,
			totalIva,
			total,
			productos,
			cedula,
		}))(req.body);
		let details = await saleModel.create(sale);
		res.sendStatus(201);
	} catch (e) {
		if (e.code === 11000) {
			httpConflictError(res, Object.keys(e.keyValue)[0]);
			return;
		}

		if (e.errors !== undefined) {
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
