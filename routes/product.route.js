const express = require('express');
const { upload }= require("../_helper/image.multer")
const fileUpload = require('express-fileupload')

const router = express.Router();

const controller = require("../controllers/product.controllers");
router.use(fileUpload());
// Define routes
router.post('/createProduct/:id', controller.createProduct)
router.get("/getAllProduct", controller.getAllProduct)
router.get("/getProductById/:id", controller.getProductById)
router.get("/getProductsByName/:name", controller.getProductsByName)
module.exports = router; // Export the router

