const express = require("express");
const viewController = require("../contollers/viewController");
const router = express.Router();

router.get("/signup", viewController.getSignUp);
router.get("/signin", viewController.getSignIn);

router.get("/", viewController.getHomePage);

module.exports = router;
