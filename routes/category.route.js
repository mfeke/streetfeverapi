
const express = require('express');
const router = express.Router();
const controller = require("../controllers/category.controller");

// Define routes
router.post("/createCategory", controller.createCategory)
router.get("/getAllCategory", controller.AllCategory)

module.exports = router; // Export the router

