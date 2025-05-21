const mongoose = require("mongoose");

const Product = mongoose.model(
    "Products",
    new mongoose.Schema({
        title: String,
        subtitle: String,
        price: String,
        image: String,
        itemImage: Array,
        colourImage: Array,
        categoriesArray: Array,
    })

)

module.exports = Product