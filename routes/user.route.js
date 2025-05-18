const { verifySignUp } = require("../middleware");

const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");

// Define routes
router.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail,controller.signup);
router.post("/signin", controller.signin);


module.exports = router; // Export the router

