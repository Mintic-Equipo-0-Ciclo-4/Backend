const router = require("express").Router();
const clientController = require("../controllers/clients");

router.get("/", clientController.getItems);
router.get("/:id", clientController.getItem);
router.post("/", clientController.createItem);
router.patch("/", clientController.updateItem);
router.delete("/:id", clientController.deleteItem);

module.exports = router;
