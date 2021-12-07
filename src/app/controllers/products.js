const productModel = require("../models/products");
const { httpServerError } = require("../helpers/httpError");
const { verifyRequired, verifyUnique } = require("../helpers/databaseSecurity");

const getItem = async (req, res) => {
	try {
		const { id: codigo } = req.params;
		const product = await productModel.findOne({ codigo });
		res.status(product !== null ? 200 : 404).send(product);
	} catch (e) {
		httpServerError(req, e);
	}
};

const getItems = async (req, res) => {
	try {
		const products = await productModel.find({});
		res.send(products);
	} catch (e) {
		httpServerError(res, e);
	}
};

const createItems = async (req, res) => {
	await deleteItems();
	try {
		const requiredFields = ["codigo", "nombre", "ivaCompra", "precioCompra", "precioVenta", "nitProveedor"];
		const uniqueFields = ["codigo", "nombre"];
		const { productos } = req.body;

		for (let producto of productos) {
			console.log(producto);
			let errorResponse = verifyRequired(producto, requiredFields) || (await verifyUnique(producto, uniqueFields, productModel));
			if (errorResponse) return res.status(errorResponse.status).send(errorResponse);
			let details = await productModel.create(producto);
		}
		res.sendStatus(201);
	} catch (e) {
		httpServerError(res, e);
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id: codigo } = req.params;
		const deleted = await productModel.findOneAndDelete({ codigo });
		res.sendStatus(deleted !== null ? 200 : 404);
	} catch (e) {
		httpServerError(res, e);
	}
};

const deleteItems = async (req, res) => {
	try {
		const deleted = await productModel.deleteMany({});
		if (res !== undefined) res.sendStatus(200);
	} catch (e) {
		httpServerError(res, e);
	}
};

module.exports = { getItem, getItems, createItems, deleteItem, deleteItems };
