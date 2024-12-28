const express = require("express");
const userController = require("../contollers/userController");
const authController = require("../contollers/authController");
const router = express.Router();

router.post("/signup", authController.register);
router.post("/signin", authController.signin);

router.route("/").get(userController.getAll).post(userController.createUser);
router
  .route("/:id")
  .get(userController.getOne)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
