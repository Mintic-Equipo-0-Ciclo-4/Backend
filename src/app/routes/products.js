const router = require("express").Router();
const productsController = require("../controllers/products");
const auth = require("../middleware/auth");

router.get("/", auth, productsController.getItems);

router.get("/:id", auth, productsController.getItem);

router.post("/", auth, productsController.createItems);

router.delete("/:id", auth, productsController.deleteItem);

router.delete("/", auth, productsController.deleteItems);

module.exports = router;
