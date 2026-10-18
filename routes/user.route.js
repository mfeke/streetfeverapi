const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");
const multer = require('multer');
const upload = multer(); // Initialize multer without a storage destination

// Define routes
router.post("/signup", [upload.none(), authJwt.checkDuplicateUsernameOrEmail],controller.signup);
router.get("/getUser", authJwt.verifyToken, controller.getProfile)
router.post("/signin", upload.none(), controller.signin)
module.exports = router; // Export the router

