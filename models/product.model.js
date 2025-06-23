const mongoose = require("mongoose");

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    title: String,
    price: String,
    description:String,
    care:String,
    colour:String,
    image: Array,
    sizes: Array,
    brand: String,
    mainCategory: Array,
  })
);

module.exports = Product;
