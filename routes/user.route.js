const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");

// Define routes
router.post("/signup",controller.signup);
router.get("/getUser",authJwt.verifyToken, controller.getProfile)
router.post("/signin", controller.signin)
module.exports = router; // Export the router

