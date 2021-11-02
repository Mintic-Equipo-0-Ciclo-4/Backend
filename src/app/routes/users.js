const router = require("express").Router();
const usersController = require("../controllers/users");
const auth = require("../middleware/auth");

router.get("/", auth, usersController.getItems);

router.get("/:id", usersController.getItem);

router.post("/", usersController.createItem);

router.patch("/", auth, usersController.updateItem);

router.delete("/:id", auth, usersController.deleteItem);

module.exports = router;
