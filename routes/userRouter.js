const express = require("express");
const userController = require("../contollers/userController");
const authController = require("../contollers/authController");
const router = express.Router();

router.post("/register", authController.register);

router.route("/").get(userController.getAll).post(userController.createUser);
router
  .route("/:id")
  .get(userController.getOne)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
