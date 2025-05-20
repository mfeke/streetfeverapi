const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        name: String,
        parent_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }],
        categoryValue: String,
        categoriesArray: Array,
    })

)

module.exports = Categories