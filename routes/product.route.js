const express = require('express');
const router = express.Router();
const controller = require("../controllers/product.controllers");

// Define routes
router.get("/getAllProduct", controller.getAllProduct)
// router.get("/getProductById/:id", controller.getProductById)

module.exports = router; // Export the router

