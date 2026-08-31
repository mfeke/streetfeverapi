const express = require('express');
 //const { upload }= require("../_helper/image.multer")
const fileUpload = require('express-fileupload')

const router = express.Router();
const multer = require('multer');


const upload = multer(); // Initialize multer without a storage destination

const controller = require("../controllers/product.controllers");

// Define rout
router.post('/createProduct/', upload.none() ,controller.createProduct)
router.get("/getAllProduct", controller.getAllProduct)
router.get("/getProductById/:id", controller.getProductById)
router.get("/getProductsByName/:name", controller.getProductsByName)
module.exports = router; // Export the router

