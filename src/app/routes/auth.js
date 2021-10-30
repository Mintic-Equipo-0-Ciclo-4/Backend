const router = require("express").Router();
const authController = require("../controllers/auth");

router.get("/", authController.getItem);

router.post("/", authController.createItem);

router.delete("/", authController.deleteItem);

module.exports = router;
