const httpServerError = (res, error) => {
	console.trace(error);
	res.status(500);
	res.send({ error: "Error interno del servidor. Revisar el trace de errores" });
};

const httpBadRequestError = (res, error) => {
	console.trace(error);
	res.status(400);
	res.send({ error: error });
};

const httpConflictError = (res, conflictParam) => {
	res.status(409);
	res.send({ conflictParam: conflictParam });
};
module.exports = { httpServerError, httpBadRequestError, httpConflictError };
