const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: { type: String, unique: true, required: true },
		cedula: { type: String, unique: true, required: true },
		email: { type: String, unique: true, required: true },
		sucursal: { type: String, required: true },
		password: { type: String, required: true },
		nombre: { type: String, required: true },
	},
	{
		timestamps: true,
		_id: true,
		versionKey: false,
	}
);

module.exports = model("users", userSchema);
