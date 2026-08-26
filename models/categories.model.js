const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        name: String,
        description:String,
        image:String,
        returnV:Boolean,
        parentId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }],
    })

)

module.exports = Categories