const { Schema, model } = require("mongoose");

const productSchema = new Schema(
	{
		codigo: { type: String, unique: true, required: true },
		nombre: { type: String, unique: true, required: true },
		ivaCompra: { type: Number, unique: false, required: true },
		precioVenta: { type: Number, unique: false, required: true },
		nitProveedor: { type: String, unique: false, required: true },
		precioCompra: { type: Number, unique: false, required: true },
	},
	{
		timestamps: true,
		_id: true,
		versionKey: false,
	}
);

module.exports = model("products", productSchema);
