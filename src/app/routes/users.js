const router = require("express").Router();
const usersController = require("../controllers/users");

router.get("/", usersController.getItems);

router.get("/:id", usersController.getItem);

router.post("/", usersController.createItem);

router.patch("/", usersController.updateItem);

router.delete("/:id", usersController.deleteItem);

module.exports = router;
