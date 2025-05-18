const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        CatName:String,
        mainCategories:Array,
        categoryValue:String, 
        CategoriesArray:Array,
        tagCodes:Array
    })

)

module.exports = Categories