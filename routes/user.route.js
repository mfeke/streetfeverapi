const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");

// Define routes
router.post("/signup",controller.signup);
router.get("/getUser",authJwt.verifyToken, controller.getProfile)

module.exports = router; // Export the router

