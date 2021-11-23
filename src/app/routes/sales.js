const router = require("express").Router();
const salesController = require("../controllers/sales");
const auth = require("../middleware/auth");

router.get("/", auth, salesController.getItems);

router.get("/:id", auth, salesController.getItem);

router.get("/client/:id", auth, salesController.getByClientItem);

router.post("/", auth, salesController.createItem);

router.delete("/", auth, salesController.deleteItems);

module.exports = router;
