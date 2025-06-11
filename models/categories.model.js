const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        name: String,
        icon:String,
        image:String,
        returnV:Boolean,
        parent_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }],
        categoryValue: String,
    })

)

module.exports = Categories