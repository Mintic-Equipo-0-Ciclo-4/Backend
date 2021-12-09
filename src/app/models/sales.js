const { Schema, model } = require("mongoose");

const saleSchema = new Schema(
	{
		consecutivo: { type: String, unique: true, required: true },
		sucursal: { type: String, unique: false, required: true },
		subtotal: { type: Number, unique: false, required: true },
		totalIva: { type: Number, unique: false, required: true },
		productos: { type: Array, unique: false, required: true },
		cedula: { type: Number, unique: false, required: true },
		total: { type: Number, unique: false, required: true },
	},
	{
		timestamps: true,
		_id: true,
		versionKey: false,
	}
);

module.exports = model("sales", saleSchema);
