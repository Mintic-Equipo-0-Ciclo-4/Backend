const userModel = require("../models/products");
const { httpServerError, httpBadRequestError, httpConflictError } = require("../helpers/httpError");

const getItem = (req, res) => {};
const getItems = (req, res) => {};
const createItem = (req, res) => {
	// const { productos } = req.body;
	// console.log(productos);
	res.sendStatus(200);
};
const updateItem = (req, res) => {};
const deleteItem = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem, deleteItems };
