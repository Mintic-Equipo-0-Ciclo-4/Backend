const mongoose = require("mongoose");

const dbConnect = () => {
	mongoose.connect(process.env.DB_URI, {}, (err) => {
		if (err) console.log("**************** Error al conectar con la base de datos ****************");
		else console.log("**************** Base de datos conectada correctamente ****************");
	});
};

module.exports = { dbConnect };
