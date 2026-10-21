//const { verifySignUp } = require("../middleware");
//const { authJwt } = require("../middleware");
const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");
const multer = require('multer');
const { verifySignUp } = require('../middleware');
const upload = multer(); // Initialize multer without a storage destination

// Define routes
router.post("/user/signup", [upload.none(), verifySignUp.checkDuplicateEmail ],controller.signup);
router.get("/user/getUser", controller.getProfile)
router.post("/user/signin", upload.none(), controller.signin)
module.exports = router; // Export the router

