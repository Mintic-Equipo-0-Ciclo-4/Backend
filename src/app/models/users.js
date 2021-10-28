const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		cedula: { type: String, unique: true, required: true },
		email: { type: String, unique: true, required: true },
		username: { type: String, unique: true, required: true },
		nombre: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
		_id: true,
		versionKey: false,
	}
);

module.exports = model("users", userSchema);
