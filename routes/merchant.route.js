
const express = require('express');
const router = express.Router();
const controller = require("../controllers/merchant.controller");
const multer = require('multer');
const { verifySignUp } = require('../middleware');
const  { authJwt } = require("../middleware");

const upload = multer(); // Initialize multer without a storage destination

// Define routes
router.post("/merchant/signup", [upload.none(), verifySignUp.checkDuplicateEmail], controller.signup);
//router.get("/merchant/getUser")
router.post("/merchant/signin", upload.none(), controller.signin)
router.put("/merchant/updateProfile",[upload.none() ,authJwt.verifyToken ],controller.updateProfile)

module.exports = router; // Export the router
