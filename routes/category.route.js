
const express = require('express');
const router = express.Router();
const controller = require("../controllers/category.controller");

// Define routes
router.post("/createCategory", controller.createCategory)
router.get("/getAllCategory", controller.AllCategory)
router.get("/getMainCategory", controller.getMainCategory)

module.exports = router; // Export the router

