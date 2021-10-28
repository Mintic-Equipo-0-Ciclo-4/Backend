const router = require("express").Router();
const userController = require("../controllers/users");

router.get("/", userController.getItems);

router.get("/:id", userController.getItem);

router.post("/", userController.createItem);

router.patch("/", userController.updateItem);

router.delete("/:id", userController.deleteItem);

module.exports = router;
