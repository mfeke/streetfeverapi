const mongoose = require("mongoose");

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    name: String,
    price: Number,
    salePrice: Number,
    description:String,
    colour:Array,
    images: Array,
    sizes: Array,
    category: Array,
  })
);

module.exports = Product;
