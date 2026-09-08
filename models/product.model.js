const mongoose = require("mongoose");

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    name: String,
    price: String,
    salePrice: String,
    description:String,
    images: Array,
    material:String,
    variant: Array,
    category: Array,
  })
);

module.exports = Product;
