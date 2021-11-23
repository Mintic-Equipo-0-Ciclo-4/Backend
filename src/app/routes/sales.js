const router = require("express").Router();
const salesController = require("../controllers/sales");

router.get("/", salesController.getItems);

router.get("/:id", salesController.getItem);

router.get("/client/:id", salesController.getByClientItem);

router.post("/", salesController.createItem);

router.delete("/", salesController.deleteItems);

module.exports = router;
