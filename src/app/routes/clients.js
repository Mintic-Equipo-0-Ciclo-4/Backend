const router = require("express").Router();
const clientController = require("../controllers/clients");
const auth = require("../middleware/auth");

router.get("/", auth, clientController.getItems);
router.get("/:id", auth, clientController.getItem);
router.post("/", auth, clientController.createItem);
router.patch("/", auth, clientController.updateItem);
router.delete("/:id", auth, clientController.deleteItem);

module.exports = router;
