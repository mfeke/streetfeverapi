const mongoose = require("mongoose");

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    name: String,
    price: Number,
    salePrice: String,
    description:String,
    images: Array,
    stock: Array,
    category: Array,
  })
);

module.exports = Product;
