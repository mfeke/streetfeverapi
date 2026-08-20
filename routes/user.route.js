const { verifySignUp } = require("../middleware");

const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");

// Define routes
router.post("/signup",controller.signup);


module.exports = router; // Export the router

