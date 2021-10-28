const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
	{
		email: { type: String, unique: true, required: true },
		cedula: { type: String, unique: true, required: true },
		nombre: { type: String, unique: false, required: true },
		telefono: { type: String, unique: true, required: true },
		direccion: { type: String, unique: false, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
		_id: true,
	}
);

module.exports = model("clients", clientSchema);
