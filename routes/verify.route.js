const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const express = require('express');
const router = express.Router();
const controller = require("../controllers/verify.controller");

// Define routes
router.get("/getCode/:code",  controller.getVerifyByName)

module.exports = router; // Export the router
