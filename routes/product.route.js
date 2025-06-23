const express = require('express');

const router = express.Router();

const controller = require("../controllers/product.controllers");

// Define routes
router.get("/getAllProduct", controller.getAllProduct)
router.get("/getProductById/:id", controller.getProductById)
router.get("/getProductsByName/:name", controller.getProductsByName)
module.exports = router; // Export the router

