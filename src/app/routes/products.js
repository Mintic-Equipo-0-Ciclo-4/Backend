const router = require("express").Router();
const productsController = require("../controllers/products");

router.get("/", productsController.getItems);

router.get("/:id", productsController.getItem);

router.post("/", productsController.createItems);

// router.patch("/", productsController.updateItem);

router.delete("/:id", productsController.deleteItem);

router.delete("/", productsController.deleteItems);

module.exports = router;
