const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("Hola Mundo");
});

router.get("/:id", (req, res) => {});

router.post("/:", (req, res) => {});

router.patch("/", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
