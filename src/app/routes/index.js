const router = require("express").Router();
const fs = require("fs");

const removeExtension = (file) => {
	return file.split(".").shift();
};

fs.readdirSync(__dirname).forEach((file) => {
	let route = removeExtension(file);
	if (route === "index") return;

	router.use(`/${route}`, require(`./${route}`));
});

module.exports = router;
